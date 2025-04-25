async function write<es, ax, di>() {
    mov(ax, 3);
    int(0xff);
}

async function clear<es, ax, di>(): iret {
}

