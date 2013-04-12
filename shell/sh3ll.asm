org 500h
use16
;const-------------------
_reboot 	  equ	 0
_get_char	  equ	 1
_printf 	  equ	 2
_find_file	  equ	 3
_exec		  equ	 4
_find_first	  equ	 5
_color		  equ	 6
_setcursor	  equ	 7
_gets		  equ	 8
_cls		  equ	 9
_getcursor	  equ	 0xa
_setminmaxcolline equ	 0xb
;------------------------
_cmd_size	 equ	80

	 ;mov     al,_color
	 ;mov     cx,0x0003		    ;Черный фон, синие символы
	 ;int     0xff

	mov	al,_printf		        ;Выводим приветствие
	mov	bx,hi
	int	0xff

            					;bl=min col, bh=max col
            					;cl-min line,ch=max line
	mov	al,_setminmaxcolline
	xor	bx,bx			        ;устанавливаем границу
	inc	bl			            ;которую нельзя удалить
					            ;mov     cx,2479;<сторока><ряд> максимальные
	mov	cl,79
	mov	ch,24
	int	0xff

	jmp    _for_not_zero_mem
cmd_read:
	push	_cmd_buff
	call	zeromem
_for_not_zero_mem:
	mov	al,_printf
	mov	bx,prompt
	int	0xff
					;_if_no_need_show_sms:
	mov	al,_gets
	mov	bx,_cmd_buff
	mov	cx,_cmd_size
	int	0xff

all_good_read:
;юзер ввел h3lp
	mov	di,_cmd_buff
	mov	si,cmd_help
	call	strcmp
	or	al,al
	jz     func_help
;юзер ввел r3b00t
	mov	di,_cmd_buff
	mov	si,cmd_reboot
	call	strcmp
	or	al,al
	jz     sh3ll_end
;юзер ввел d1r
	mov	di,_cmd_buff
	mov	si,cmd_dir
	call	strcmp
	or	al,al
	jz     func_dir
;юзер ввел color
	mov	di,_cmd_buff
	mov	si,cmd_сolor
	call	strcmp
	or	al,al
	jz     func_color
;юзер ввел cls
	mov	di,_cmd_buff
	mov	si,cmd_cls
	call	strcmp
	or	al,al
	jz     func_cls

	jmp	func_exec_file

cmd_not_found:
	mov	al,_printf
	mov	bx,command_not_found
	int	0xff

	jmp	cmd_read

func_dir:
	xor	bx,bx
func_dir_search:
	inc	bx
	push	bx
	mov	al,_find_first
	int	0xff
	pop	bx
	push	bx
	or	ax,ax
	jz     func_dir_end

	mov	si,ax			;результат же в ax'е
	mov	byte[si+$b],0
	dec	si
	mov	byte[si],$d
	mov	al,_printf
	mov	bx,si
	int	0xff
	pop	bx
	jmp	func_dir_search
func_dir_end:
	pop	cx
	cwd
	push	dx
	mov	cx,0x0d0d
	push	cx
	mov	bx,sp
	mov	al,_printf
	int	0xff
	pop	cx
	pop	cx
	jmp	cmd_read

func_help:
	mov	al,_printf
	mov	bx,cmd_list
	int	0xff
	jmp	cmd_read

func_color:				;в cl тextcolor, в ch bgcolor
	mov	si,di
	lodsb
	;cmp     al,0x20
	or	al,al
	jz     func_color_help
	;lodsb
	call	hex2dec
	cmp	al,$10
	jz	func_color_help
	mov	ch,al;фон

	lodsb
	call	hex2dec
	cmp	al,$10
	jz	func_color_help
	mov	cl,al;текст
	mov	al,_color
	int	0xff

	mov	al,_printf
	cwd
	push	dx
	mov	dx,0x0d0d
	push	dx
	mov	bx,sp
	int	0xff
	pop	cx
	pop	cx
	jmp	cmd_read

func_color_help:
	mov	al,_printf
	mov	bx,color_help
	int	0xff
	jmp	cmd_read

func_cls:
	mov	al,_cls
	int	0xff
	jmp	cmd_read


func_exec_file:
	mov	al,_exec
	mov	bx,_cmd_buff;di было
	int	0xff
	or	al,al
	jnz	 cmd_not_found
	jmp	 cmd_read

sh3ll_end:
	ret

strcmp:
	lodsb
	inc	di
	or	al,al
	jz	strcmp_end
	cmp	al,[di-1]
	jz	strcmp
strcmp_end:
	ret

hex2dec:
					;число от 0
	cmp	al,0x30
	jl	not_dec_num
	cmp	al,0x40
	jg	not_dec_num
					;до 9 (десятичное)
	sub	al,0x30
	ret
not_dec_num:
	cmp	al,'a'
	jl     not_num
	cmp	al,'f'
	jg     not_num
	ret
not_num:
	mov	al,$10
	ret


zeromem:
	pop	si
	pop	di
	push	si
	xor	al,al
zero_doing:
	or	[di],al
	jz     zero_doing_end
	stosb
	jmp	zero_doing
zero_doing_end:
	ret
include 'sh3ll_data.inc'