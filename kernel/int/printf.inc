printf: ;2 в bx должен быть адрес ascii строки
	push	es
	push	bx
	push	cx
	push	di
	mov	ax,0xb800
	mov	es,ax


	mov	si,bx
	call	get_size

	mov	al,_setcursor
	mov	bl,[col]
	mov	bh,[line]
	int	0xff

	;в bl;столбик
	;в bh;рядок
print:
	lodsb

	or	al,al
	jz	end_of_printf

	cmp	al,_enter
	jnz	_not_enter

	inc	[line]
	mov	[col],0
	cmp	[line],25
	jl	_nopoint2write

	call	scroll

	dec	[line]
	jmp	_nopoint2write

_not_enter:
	cmp	al,_backspace
	jnz	_not_backspace

	xor	al,al
	mov	ah,[mincol]
	cmp	ah,[col]
	jnz	 not_sub_col
	jmp	 _nopoint2write
not_sub_col:
	dec	[col]
	dec	[col]
	sub	di,2

_not_backspace:
	mov	ah,[bgcolor]
	shl	ah,4
	add	ah,[textcolor]

	stosw
	inc	[col]
_nopoint2write:
	mov	al,_setcursor
	mov	bl,[col]
	mov	bh,[line]
	int	0xff

	loop	print
	jmp	end_of_printf

get_size:
	push	si
	xor	cx,cx
get_size_loop:
	lodsb
	inc	cx
	or	al,al
	jnz	get_size_loop
	dec	cx
	pop	si
	ret

end_of_printf:
	pop	di
	pop	cx
	pop	bx
	pop	es
	iret

scroll:
    pusha
    mov    ax,0xb800
    mov    ds,ax
    mov    es,ax
    mov    si,80*2
    xor    di,di
    mov    cx,80*24*2
    rep    movsb

    xor    ax,ax

    mov    ds,ax
    mov    ah,[bgcolor]
    shl    ah,4
    add    ah,[textcolor]
    mov    cx,80;*24*2
    rep    stosw

    popa
    ret
