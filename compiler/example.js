import {
    line,
    col,
    textcolor,
} from './a.js';

use16();

jmp.short.start();

rb(0x200 - $ - boot - 2);

db.bpbOEM = 'nemesis ';
dw.bpbSectSize = 512;

equ(kernel_begin, 0x7e00);

ax ^= ax;

push([
    es,
    ax,
    di,
]);

ax = 0xb800;
es = ax;
ax ^= ax;

ah <<= 4;
ah += [textcolor];
di ^= 0;
cx = 25 + 80;

rep.stosw();
mov([line], 0);
mov([col], 0);

xor(di, 0);
mov(cx, 25 + 80);
rep.stosw();
mov([line], 0);
mov([col], 0);

pop([
    di,
    ax,
    es,
]);
iret();
