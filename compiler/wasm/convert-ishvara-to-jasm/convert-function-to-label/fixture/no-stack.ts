async function write() {
    mov(ax, 3);
    int(0xff);
}

async function clear(): iret {
}

