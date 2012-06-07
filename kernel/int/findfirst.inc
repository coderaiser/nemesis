find_first:;5 ложим в bх хендл(номер ;))файла
		;в ax будет лежать имя
	;---------------------------------------------
	push	bx
	xor	cx,cx
	mov	cl,3
sec_reading_find:
	push	cx

	mov	al,_secread; reading the sector
	mov	ah,1  ; how much sectors? 1
	mov	bx,0x7c00 ;buffer
	mov	cl,2;sector
	mov	ch,0;19;track
	xor	dx,dx
	inc	dh;головка 1(вторая)
	int	0xff

	pop	cx
	jnc	find_sec_loaded

	clc
	loop	sec_reading_find

find_sec_loaded:
	mov	si,0x7c00-0x20
	pop	cx
find_file_search:
	add	si,0x20
	lodsb
	or	al,al
	jz	file_not_found1
	dec	si
	loop	find_file_search
find_all_good1:
	;xor     al,al
	mov	 ax,si

;        cli
;        pop     ds
 ;       sti

	iret
file_not_found1:

;        cli
;        pop     ds
;        sti

	;mov     al,1

	xor	ax,ax
	iret