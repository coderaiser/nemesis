write: {
    push([]);
    mov(ax, 3);
    int(0xff);
    pop([]);
    ret;
}
clear: {
    push([]);
    pop([]);
    iret;
}
