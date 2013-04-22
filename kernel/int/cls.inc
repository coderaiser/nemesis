cls:
	push	es
	push	ax
	push	di
	mov	ax,0xb800
	mov	es,ax
	xor	ax,ax
	mov	ah,[bgcolor]
	shl	ah,4
	add	ah,[textcolor]
	xor	di,di
	mov	cx,25*80
	rep	stosw
	mov	[line],0
	mov	[col],0
	pop	di
	pop	ax
	pop	es
	iret
