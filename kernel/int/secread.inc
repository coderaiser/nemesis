secread:;ah - кол-во секторов
	;bx - buffer
	;cl - номер сектора
	;ch - номер дорожки
	;dl - номер накопителя(0 для дискеты первой)
	;dh - головка
	cmp	cl,0x12
	jle	sector_norm
	mov	ax,1;
	jmp	end_of_secreading
sector_norm:
	cmp	dh,1
	jle	head_norm
	mov	ax,2
	jmp	end_of_secreading
head_norm:

secread_all_good:
	mov	[sec_quantity],ah
	mov	[secbuffer],bx
	mov	[sec_number],cl
	mov	[track_number],ch
	mov	[drive],dl
	mov	[head],dh


secreading:
	dec	[sec_quantity]

	sti;разрешаем прерывания
	mov	dx,0x3f2
	mov	al,28;2,3 and 4th bits
	;4+8+16
	;сброс контролера(2)
	;юзаем DMA       (3)
	;запускаем мотор (4)
	out	dx,al;шлем команду, ждем разгона мотора
	mov	cx,3500
	loop	$;мутим задержку несколько мс
	mov	ah,15;номер кода
	call	out_fdc;посылаем контроллеру НГМД
	xor	ah,ah;номер накопителя(дискета ;))
	;mov      ah,[drive]
	call	out_fdc
	;xor     ah,ah;номер дорожки
	mov	 ah,[track_number]
	call	out_fdc
	call	wait_interrupt;ожидаем прерывания от нгдм
	mov	cx,1750;счетчик цикла задержки
	loop	$
	mov	al,[dma_command];0x4a;для записи 0x46
	;код чтения данных контроллера нмгд
	out	12,al;посылаем код по 2-ум адресам
	out	11,al;вычисляем адрес буфера
	mov	ax,[secbuffer];смещение буфера в ds
	mov	bx,ds
	mov	cl,4;готовим вращения старшего нибла
	rol	bx,cl;вращаем младшие 4 бита
	mov	dl,bl
	and	dl,0xf;чистим старший нибл в dl
	and	bl,0xf0;чистим младший нибл в bl
	add	ax,bx
	jnc	no_carry;если небыло переноса
			;то страници в dl
	inc	dl;увеличиваем dl, если был перенос
no_carry:
	out	4,al;посылаем младший байт адреса
	mov	al,ah;сдвигаем старший байт
	out	4,al;посылаем младший байт адреса
	mov	al,dl;засылаем номер страницы
	out	0x81,al;посылаем номер страницы
;конец ебаной инициализации
	mov	 ax,0x200-1;значение счетчика
	out	 5,al;посылаем младший байт
	mov	 al,ah;готовим старший байт
	out	 5,al;посылаем старший байт
	mov	 al,2;готовим разрешение канала 2
	out	 10,al;DMA ожидает данные
;получаем указатель на базу диска
	;mov      al,0x1e;номер вектора
			;указывающего на таблицу
	;mov      ah,0x35;номер функции
	;int       0x21
	;Код выше идет лесом потому, что ебаного доса у нас
	;нет, и вообще пошол он сука нахуй >:(!
	;mov      ax,[es:0x1e*4]

	;mov       bx,0x1e*4;es у нас и так ноль ;)!

	mov	  ah,[secread_com];0xE6;0x66;код чтения одного сектора
	call	  out_fdc;посылаем команду контроллеру нмгд
	;xor       ah,ah;номер головки и накопителя
	mov	  ah,[head];head/drive по форумуле
			   ;00000hdd, поэтому если головка 1
			   ;то в ah будет 4=2^2
	shl	  ah,2
	call	  out_fdc
	;xor       ah,ah;номер цилиндра
	mov	   ah,[track_number]
	call	  out_fdc
	;xor       ah,ah;номер головки
	;mov        ah,0
	mov	   ah,[head]
	call	  out_fdc
	;mov       ah,1;номер записи
	mov	   ah,[sec_number]
	call	  out_fdc
	mov	  ah,2;0x200 [es:bx+3];код размера сектора
	call	  out_fdc
	mov	  ah,0x12;[es:bx+4];номер конца дорожки

	call	  out_fdc
	mov	  ah,0x1B;[es:bx+5];длина сдвига
	call	  out_fdc
	mov	  ah,0xFF;[es:bx+6];длина данных
			 ;неиспользуется потому, что
			 ;размер сектора задан!
	call	  out_fdc
	call	  wait_interrupt
;читаем результируюющие байты
	mov	  cx,7;берем 7 байтов статуса
	mov	  bx,stutus_buffer
next:
	call	  in_fdc;получаем байт
	mov	  [bx],al;помещаем в буфер
	inc	  bx;указываем на следующий байт буфера
	loop	  next;повторяем операцию
;выключаем мотор
	mov	  dx,0x3f2
	mov	  al,12;оставляем биты 3 и 4
	out	  dx,al;посылаем новую установку

	;jmp      [secbuffer]

	add	 [secbuffer],0x200

	inc	 [sec_number]
	cmp	 [sec_number],0x12
	jle	 not_new_track
	inc	 [track_number]
	mov	 [sec_number],1
not_new_track:
	xor	 al,al
	or	 [sec_quantity],al
	jnz	 secreading

end_of_secreading:
	iret;

;---------------------------------------------------------
wait_interrupt:;ждем прирывание нгмд; управление статусом
	       ;прерывания 6 в байте статуса BIOS
	push	es
	mov	ax,0x40;Сегмент области данных BIOS
	mov	es,ax;помещаем в es
	mov	bx,0x3e;смещение для байта статуса
wait_interrupt_again:
	mov	dl,[es:bx];получаем байт
	test	dl,0x80;проверяем бит 7
	jz	wait_interrupt_again
	and	dl,01111111b;сбрасываем бит 7
	mov	[es:bx],dl;заменяем байт стутуса
	pop	es
	ret

;Функция связи с контроллером нгмд
out_fdc:;шлем байт из ah fdc
	mov	dx,0x3f4;адрес порта регистра статуса
keep_trying:;Смотрим готов ли контроллер принимать команды
	in	al,dx;и данные
	test	al,0x80;128
	jz	keep_trying;если прыгним - не готов, сука!
	inc	dx;указываем на регистр данных
	mov	al,ah;то, что мы передали в функцию
	out	dx,al;посылаем значение
	ret

in_fdc:;получаем байт от fdc в al
	mov	dx,0x3f4
once_again:
	in	al,dx;получаем значение
	test	al,0x80;(128) бит 7 установле?
	jz	once_again
	inc	dx;указываем на регистр данных
	in	al,dx;читаем байт из регистра данных
	ret
;---------------------------------------------------------
;Данные!!!!!!! СУКА!!!!!!!!!
stutus_buffer rb	7
;buffer:
sec_quantity  db	0
secbuffer     dw	0
sec_number    db	0
track_number  db	0
drive	      db	0
head	      db	0
secread_com   db	0xE6
dma_command   db	0x46
;0x4a;для записи 0x46;код чтения данных контроллера нмгд