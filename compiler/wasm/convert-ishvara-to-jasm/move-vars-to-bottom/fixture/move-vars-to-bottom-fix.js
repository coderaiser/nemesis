// example.ts
cls: {
    push(es);
    push(ax);
    push(di);
    mov(ax, 47104);
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
var line = 3;
var col = 0;
var textcolor = 2;
var bgcolor = 0;
