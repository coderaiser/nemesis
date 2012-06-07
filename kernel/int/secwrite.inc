secwrite:;ah - кол-во секторов
	 ;bx - buffer
	 ;cl - номер сектора
	 ;ch - номер дорожки
	 ;dl - номер накопителя(0 для дискеты первой)
	 ;dh - головка
	 mov	  [secread_com],0xC5;запись для контроллера
	 mov	  [dma_command],0x4a;запись для dma
	 mov	  al,_secread
	 int	  0xff;все параметры есть :), хули
	 ;меняем переменную на чтение как было
	 mov	  [secread_com],0xE6;чтение для контроллера
	 mov	  [dma_command],0x46;чтиние для dma
	 iret