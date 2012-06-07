gets:;в bx ложится буфер
     ;в сx ложится кол-во символов
	push	 bx
getting_the_char:
	mov	 di,bx
	mov	 al,_get_char
	int	 0xff

	;or       al,al
	;jz       getting_the_char
	stosb

	push	 ax
	mov	 al,_printf
	int	 0xff
	inc	 bx

	pop	ax

	cmp	 al,_backspace;backspace
	jnz	 not_backspace
	inc	 cx
	dec	 bx
	dec	 di
	pop	 ax
	cmp	 di,ax
	push	 ax
	jz	 no_need_to_dec
	inc	 cx
	dec	 bx
	xor	 al,al
	stosb
	dec	 di
no_need_to_dec:
	xor	 al,al
	dec	 di
	stosb

not_backspace:
	cmp	al,_enter;enter
	jz	get_end

	loop	 getting_the_char
get_end:
	dec	di
	xor	al,al
	stosb
	pop	bx
	iret