org 7c00h
use16
boot:   jmp     short start
line    db      90h

;------------------------------------------;
;  Standard BIOS Parameter Block, "BPB".   ;
;------------------------------------------;
    bpbOEM              db  'nemizida';
    bpbSectSize         dw  512
    bpbClustSize        db  1
    bpbReservedSec      dw  1
    bpbFats             db  2
    bpbRootSize         dw  224
    bpbTotalSect        dw  2880
    bpbMedia            db  240
    bpbFatSize          dw  9
    bpbTrackSect        dw  18
    bpbHeads            dw  2
    bpbHiddenSect       dd  0
    
    ;bpbLargeSect       dd  0
    
    kernel_offset       dw  0
    kernel_size         dw  0

;---------------------------------;
;  extended BPB for FAT12/FAT16   ;
;---------------------------------;
    bpbDriveNo          db  0
    
    ;bpbReserved        db  0
    kernel_sec_size     db  0
    
    bpbSignature        db  41      ; 0 = nothing more. 41 = three more (below)..
    bpbID               dd  1
    bpbVolumeLabel      db  'BOOT FLOPPY'
    bpbFileSystem       db  'FAT12   '
        
kernel_begin    equ	0x7e00

;----------------------------------------;
;   starting point of bootsector code    ;
;----------------------------------------;

start:
    xor     ax, ax   ; initialize all the necessary
    mov     ds, ax   ; registers.
    mov     es, ax
    mov     ss, ax
    
    dec     ax
    mov     sp, ax
    
    mov     ax, 3   ; Очистим экран
    int     10h
    
    push    loader_nameEnd
    push    szloader_name - loader_name
    call    printf
sec_reading:
    push    cx
    
    mov     ah, 2               ; reading the sector #2
    mov     al, 1               ; how much sectors? 1
    mov     bx, kernel_begin    ; buffer
    mov     cl, 2               ; sector
    mov     ch, 0               ; track
    xor     dx, dx
    inc     dh                  ;головка 1(вторая)
    int     13h
    
    pop     cx
    jnc     _find_file
    
    clc
    loop    sec_reading
    
    push    error_reading
    push    szerror_reading - error_reading
    call    printf
    jmp     reboot
_find_file:
    mov     si, kernel_begin	;0x7e00
    mov     bx, si
_find_file_next:
    mov     di, kernel_name
    mov     si, bx
    mov     cx, szkernel_name-kernel_name
    repe    cmpsb
    or      cx, cx
    jnz     _find_file_not	;строки неравны :(
    jmp     find_kernel
_find_file_not:
	  add	  bx,0x20
	  mov	  si,bx
	  lodsb
	  or	  al,al
	  jz	  _error_finding	;в корне ядра нема :(
	  jmp	  _find_file_next
find_kernel:
	  add	  si,$14
	  lodsw
	  mov	  [kernel_offset],ax

	  lodsw
	  mov	  [kernel_size],ax

	  mov	  cx,0x200
	  cwd
	  div	  cx

	  or	  dx,dx
	  jz	  bez_ostatka
	  inc	  al
bez_ostatka:
	  mov	  [kernel_sec_size],al


	  push	  kernel_fined
	  push	  szkernel_fined-kernel_fined
	  call	  printf

	  mov	  cx,3
;Грузим ядро
sec_reading2:
	push	cx

	mov	bx,kernel_begin		;$a000 ;buffer
	mov	ax,[kernel_offset]
	sub	al,2
	mov	cx,0x200		;track/sector 0/2
	mul	cx
	add	ax,0x4200
	cwd				;необязательно... но, мало ли... лучше
	div	cx			;пропишем, что б потом неожиданностей небыло...
					;получаем количество секторов в ax
	mov	cx,18			;дорожка
	cwd
	div	cx
					;в ax номер дорожки
					;в dx номер сектора на дорожке
	or	dl,dl
	jnz	not_sec1

not_sec1:
	inc	dl
	mov	cl,dl			;номер сектора
	mov	dx,ax			;смотрим парная ли дорожка
	push	dx
	push	bx
	mov	bx,2
	cwd
	div	bx
	mov	ch,al			;в ch номер дорожки
	mul	bx			;если парная - нужно перевернуть
		  			;дискетук a.k.a головке один
	pop	bx
	pop	dx
	cmp	dx,1;ax;присвоить
	jnz	not_twin;

	jmp	twin
not_twin:				;не парное число секторов...
	xor	dh,dh			;0-левая головка
	jmp	not_twin_ok
twin:
	mov	dh,1;			1-ая головка
not_twin_ok:
	xor	dl,dl			;грузимся с дискетки ;)!

	mov	ah,2			;_secread;reading the sector
	mov	al,[kernel_sec_size]	; how much sectors?
	int	0x13

	jnc	 _find_kernel

	clc
	pop	  cx
	loop	  sec_reading2

	  push	  error_krnlfile
	  push	  word szerror_krnlfile-error_krnlfile
	  call	  printf

	  jmp	  reboot

_find_kernel:
	   push   kernel_load
	   push   szkernel_load-kernel_load
	   call   printf
;          jmp    $
	   jmp	  kernel_begin;0x7e00


_error_finding:
	  push	 error_finding
	  push	 szerror_finding-error_finding
	  call	 printf
	  jmp	 reboot
;Слежебные функци o_O
printf:
	  ;mov     bp,n3m1z1d4 ; Print loading message.
	  pop	  si
	  pop	  cx
	  pop	  bp
	  push	  si

	  xor	  bh,bh
	  mov	  ax, $1301   ;13(num of func),1 param
	  mov	  bl,2;green color ;)
	  ;mov     cx,8;word[szn3m1z1d4]
	  ;xor     dl,dl
	  cwd
	  mov	  dh,[line]
	  int	  0x10
	  inc	  [line]
	  cmp	  [line],24
	  jnz	  line_good
	  dec	  [line]
	  ;прокрутка в верх на одну строку
	  
      mov	  ax,0x601			;Прокрутка вверх на одну строку
	  mov	  bh,0x02   			;чорный фон, зеленые символы
	  xor	  cx,cx   			;от 00:00
	  mov	  dx,0x184f			;24:79 (весь экран)
	  int	  10h
line_good:
	  ret
reboot:
	  push	  press_any_key
	  push	  szpress_any_key-press_any_key
	  call	  printf

	  xor	  ax,ax
	  int	  16h;ждем нажатия на клаву ;)

;======================ПЕРЕЗАГРУЗКА====================
		db 0EAh
		dw 0000h
		dw 0FFFFh
;======================ПЕРЕЗАГРУЗКА====================

loader_name          db  'n3m1z1d4 loader'
szloader_name:
error_reading       db  'error reading'
szerror_reading:
kernel_fined        db  'kernel find =)'
szkernel_fined:
error_finding       db  'error finding the kernel'
szerror_finding:
error_krnlfile      db  'error loading kernel'
szerror_krnlfile:
kernel_load         db  'kernel load successfully =)'
szkernel_load:
press_any_key	    db	'press any key 4 r3st4rt.'
szpress_any_key:
kernel_name         db  'KERNEL'
szkernel_name:

		rb	0x200-($-boot)-2
		db	0x55,0xaa
