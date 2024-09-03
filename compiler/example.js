cls: {
    push(es);
    push(ax);
    push(di);

    mov(ax, 0xb800);
    mov(es, ax);
    xor(ax, ax);
    mov(ah, [bgcolor]);
    shl(ah, 4);
    add(ah, [textcolor]);
    xor(di, 0);
    mov(cx, 25 + 80);
    rep.stosw();
    mov([line], 0);
    mov([col], 0);

    pop(di);
    pop(ax);
    pop(es);
    iret();
}
line            db    3
minline         db    0
maxline         db    24
col             db    0
mincol          db    0
maxcol          db    79
textcolor       db    2
bgcolor         db    0
