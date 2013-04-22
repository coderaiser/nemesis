setcursor:
	;в bl;столбик
	;в bh;рядок
	;bx = offset
	push	es
	push	ax
	push	dx

	mov	ax,0xb800
	mov	es,ax

	mov	[col],bl
	mov	[line],bh

;--------------------------------------------------------
	xor bx, bx
	mov bl, [col] ; get x offset

	xor ax, ax
	mov al, [line]
	mov dx, 80
	mul dx ; calculate y offset

	add bx, ax ; calculate index

; select to write low byte of index
	mov al, 0xf
	mov dx, 0x03d4
	out dx, al

; write it
	mov al, bl
	mov dx, 0x03d5
	out dx, al

; select to write high byte of index
	mov al, 0xe
	mov dx, 0x03d4
	out dx, al

; write it
	mov al, bh
	mov dx, 0x03d5
	out dx, al


	xor	dx,dx
	xor	ax,ax
	mov	dl,[line]
	imul	dx,80*2
	mov	di,dx
	mov	al,[col]
	imul	ax,2
	add	di,ax ;в di возвращается положение курсора
		      ;для дальнейшего вывода
	pop	dx
	pop	ax
	pop	es
	iret
