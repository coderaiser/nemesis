find_file:;в bx ложим имя файла(ascii)
	;Считываем сектор, в котором находятся записи об
	;именнах файлах и данных о них и ищем название
	mov	di,bx
	push	di
	push	bx
;---------------------------------------------
sec_reading:
	push	cx

	mov	al,_secread  ; reading the sector
	mov	ah,1  ; how much sectors? 1
	mov	bx,0x7c00 ;buffer
	mov	cl,2;sector
	mov	ch,0;19;track
	xor	dx,dx
	inc	dh;головка 1(вторая)
	int	0xff

	pop	cx
	jnc	find_file_in_fat1

	clc
	loop	sec_reading

	;mov     al,_printf
	;mov     bp,error_reading
	;int     0xff
	pop	di
	pop	cx
	xor	al,al;error
	iret
;---------------------------------------------
find_file_in_fat1:
	mov	si,0x7c00
find_file_in_fat:
	pop	di
	push	di
       ;mov     si,file_name
	push	 si
_strcmp:
	lodsb
	cmp	[di],al
	jnz	 _strcmp_end
	inc	di
	;or      al,al
	;cmp      al,0x20
	;jnz     _strcmp
	;xor     al,al
	jmp	 _strcmp
_strcmp_end:
;ненашли если
	pop	si

	cmp	 al,0x20
	jnz	 not_equal
	xor	 al,al
not_equal:

	or	al,al
	jz	find_all_good
	add	si,0x20
	lodsb
	or	al,al
	jz	file_not_found
	dec	si
	jmp	find_file_in_fat

find_all_good:
	add	si,$1a
	lodsw
	;shl     ax,9;ax*256
	;inc     ah
	mov	[file_offset],ax
	lodsw
	mov	[file_size],ax
	mov	bx,0x200
	cwd
	div	bx
	or	dl,dl
	jz     _dl0
	inc    al
_dl0:	mov    [file_sec_size],al
	pop    di
	pop    cx
	xor    al,al

;        cli
;        pop     ds
;        sti

	iret;нашли =)!!!
file_not_found:
	pop	di
	pop	cx

;        cli
;        pop     ds
;        sti

	mov	al,1;Ничо не нашли o_O ...
	iret