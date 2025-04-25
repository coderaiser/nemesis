write: {
    push(es);
    push(ax);
    push(di);
    mov(ax, 0x3);
    int(0xff);
    pop(di);
    pop(ax);
    pop(es);
    ret;
}
clear: {
    push(es);
    push(ax);
    push(di);
    pop(di);
    pop(ax);
    pop(es);
    iret;
}
