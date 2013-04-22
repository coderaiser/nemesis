get_char:;никаких параметров не принимает.
	 ;в al возвращает ascii код нажатой клавиши
	push	bx
again:
	in	al, 0x60
	cmp	al,0xfa
	jz	again

	;Скан-коды нажатого шифта
	cmp	al,0x36;правый шифт?
	jnz	not_r_shift
	mov	[shift],1
	jmp	again
not_r_shift:
	cmp	al,0x2A;левый шифт?
	jnz	shift_of
	mov	[shift],1
	;dec     di
	;dec     di
	jmp	again
shift_of:
	;Скан-коды отпущенного шифта
	cmp	al,0x36 + 0x80
	jnz	shift_of_r
	mov	[shift],0
	jmp	again
shift_of_r:
	cmp	al,0x2A + 0x80
	jnz	just_a_key
	mov	[shift],0
	jmp	again
just_a_key:
	or	[shift],0;cl
	jnz	 with_shift
	mov	si,scan_table-1
	jmp	symbolwrite
with_shift:
	mov	si,scan_table_shift-1
symbolwrite:
	cmp	al,0xe
	jz     enter_not
	;mov     dl,al
	;sub     al,0x80
	;cmp     bl,al;отжата клавиша=тот же скан+0x80
	;jz      again
	;mov     al,dl
	mov	bl,al;dl
	xor	bh,bh
	cmp	bx,57;если клавиша отжимается
	jg	again;ложим хуй и повторяем анализ ;)

	add	si,bx
	mov	al,[si]
end_work:
	or	al,al
	jz	again

	;cmp     al,0xd
	;jnz     not_enter

	;jmp     end_of_gets
;not_enter:
	;stosw
	;inc     [col]
	;mov     byte[ds:bp],al

	;push    cx
	;mov     al,_printf
	;mov     bx,bp
	;int     0xff
	;pop     cx

	;inc     bp
enter_not:
	push	ax

	mov	al,1
	out	0x60,al

	mov	al, 0x20
	out	0x20, al

	pop	ax
	;Ожидание несколько милисикунд
	call	weit

	;loop     again
	;dec     cx
	;or      cx,cx
	;jnz      again
end_of_gets:
	pop	  bx
	iret


weit:
	push	cx
	mov	cx,0x99
_loop:
	push	cx
	loop	$
	pop	cx
	loop	_loop
	pop	cx
	ret
;Данные----------------------------------------------
shift	 db	 0;шифт нажат, или нет?


scan_table_shift:
	db  0x21,'!@#$%^&*()_=',0x21,0x21,'QWERTYUIOP{}'
	db  0xd,0x21,'ASDFGHJKL:''~',0x21,'|ZXCVBNM<>?'
	db  0x21,0x21,0x21,' '
scan_table:
	db  0x21,'1234567890-=',0x21,0x21,'qwertyuiop[]'
	db  0xd,0x21,'asdfghjkl;"`',0x21,'\zxcvbnm,./'
	db  0x21,0x21,0x21,' '
