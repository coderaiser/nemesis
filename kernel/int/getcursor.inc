getcursor:;возвращает
	;в al;столбик
	;в ah;рядок
	mov	al,[col]
	mov	ah,[line]
	iret
