write: {
    push([es, ax, di]);
    mov(ax, 3);
    int(0xff);
    pop([di, ax, es]);
    ret;
}
clear: {
    push([es, ax, di]);
    pop([di, ax, es]);
    iret;
}
