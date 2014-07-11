org 0x7e00;0x1000
use16

_reboot             equ     0
_get_char           equ     1
_printf             equ     2
_find_file          equ     3
_exec               equ     4
_find_first         equ     5
_color              equ     6
_setcursor          equ     7
_gets               equ     8
_cls                equ     9
_getcursor          equ     0xa
_setminmaxcolline   equ     0xb
_secread            equ     0xc
_secwrite           equ     0xd
;------------Клава--------
_enter              equ    0xd
_backspace          equ    0xe
    ;Чисти экран ;)
    ;mov       ax,3
    ;int       0x10
    cli;подмена прерывания
    push     ax
    push     es
    xor     ax,ax
    mov     es,ax
;Этот блок испльзуется для сохранения прерывания
    ;mov     ax,[es:20h*4]
    ;mov     [cs:int_old],ax
    ;mov     ax,[es:20h*4+2]
    ;mov     [cs:int_old2],ax
;Но нам на него похуй,поскольку востанавливать не будем ;)
    mov     ax,int_table
    mov     [es:0xff*4],ax
    mov     [es:0xff*4+2],cs

    pop     es
    pop     ax
    sti

    ;cli
    ;mov     ax,0xffff
    ;mov     es,ax
    ;sti

    ;mov     al,_secwrite  ; reading the sector
    ;mov     ah,1  ; how much sectors? 1
    ;mov     bx,0x7c00;buffer
    ;mov     cl,1;sector
    ;mov     ch,1;19;track
    ;xor     dx,dx
    ;inc     dh;головка 1(вторая)
    ;int     0xff
    ;jmp     0x500

    mov    al,_printf
    mov    bx,hi
    int    0xff

;        mov     al,_printf
;        mov     bx,ascii_pic
;        int     0xff

    ;mov     al,1
    ;mov     di,buf
    ;mov     cx,0x10
    ;int     0xff

    ;mov     al,2
    ;mov     bp,buf
    ;int     0xff

;        mov     al,3
;        mov     di,sh3ll
;        int     0xff
;        or      al,al
;        jz      good
;not_f1:
;        mov     al,2;printf
;        mov     bp,not_f
;        int     0xff
;        jmp     $
;good:
;запускаем
    mov    al,_exec
    mov    bx,sh3ll
    int    0xff

    xor    al,al;r3b00t
    int    0xff

;Вызываем командный интерпретатор

    ;mov     al,1
    ;mov     di,buf
    ;mov     cx,10
    ;int     0xff
    jmp    $

hi      db    'hello from Nemizida =)!!!',$d,0
buf     rb    $10
not_f   db    'sh3ll not found :(!',0
sh3ll   db    'SH3LL '
;=============== прерывания =) ==================
include 'int/get_char.inc'
include 'int/printf.inc'
include 'int/find_file.inc'
include 'int/exec.inc'
include 'int/color.inc'
include 'int/setcursor.inc'
include 'int/gets.inc'
include 'int/cls.inc'
include 'int/findfirst.inc'
include 'int/getcursor.inc'
include 'int/setminmaxcolline.inc'
include 'int/secread.inc'
include 'int/secwrite.inc'
int_table:


    ;cli
    ;push   ds
    ;mov    [old_ds],es
    ;mov    ds,[old_ds]
    ;sti

    or    al,al
    jz    reboot
    cmp    al,_get_char
    jz    get_char
    cmp    al,_printf
    jz    printf
    cmp    al,_find_file
    jz    find_file
    cmp    al,_exec
    jz    exec
    cmp    al,_find_first
    jz    find_first
    cmp    al,_color
    jz    color
    cmp    al,_setcursor
    jz    setcursor
    cmp    al,_gets
    jz    gets
    cmp    al,_cls
    jz    cls
    cmp    al,_getcursor
    jz    getcursor
    cmp    al,_setminmaxcolline
    jz    setminmaxcolline
    cmp    al,_secread
    jz    secread
    cmp    al,_secwrite
    jz    secwrite
    iret
reboot: ;0 перезагрузка
    db 0EAh
    dw 0000h
    dw 0FFFFh
    iret




scrol:
    push    ds
    push    es
    push    si
    push    di
    push    cx

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

    pop    cx
    pop    di
    pop    si
    pop    es
    pop    ds
    ret
;---------------------------------------------

;---------------------------------------------
;=========================================================
;================= Данные ==========================
line            db    3
minline         db    0
maxline         db    24
col             db    0
mincol          db    0
maxcol          db    79
textcolor       db    2
bgcolor         db    0
file_offset     dw    0
file_size       dw    0
file_sec_size   db    0
error_reading   db    'error reading the file o_O',0
exec_addr       dw    $500
old_ds          dw    0
old_es          dw    0

;ascii_pic db '      __________',$d
;          db   ".'`   |     |`'.",$d
;          db   "|     '-----'  |",$d
;          db   "|              |",$d
;          db   "|  .--------.  |",$d
;          db   "|  |n3m1z1d4|  |",$d
;          db   "|  |-- OS --|  |",$d
;          db   "|  |--0.01--|  |",$d
;          db   "|  ;--------;  |",$d
;          db   "|__:________:__|",$d,0