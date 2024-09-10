import {
    line,
    col,
    bgcolor,
    textcolor,
} from './a.js';

let ah = [textcolor];

use16();

jmp.short.start();

rb(0x200 - $ - boot - 2);

db.bpbOEM = 'nemesis ';
dw.bpbSectSize = 512;

equ(kernel_begin, 0x7e00);

ax ^= ax;

push(es);
push(ax);
push(di);

ax = 0xb800;
es = ax;
ax ^= ax;
ah = [bgcolor];
shl(ah, 4);
add(ah, [textcolor]);
xor(di, 0);
mov(cx, 25 + 80);
rep.stosw();
mov([line], 0);
mov([col], 0);

xor(di, 0);
mov(cx, 25 + 80);
rep.stosw();
mov([line], 0);
mov([col], 0);

pop(di);
pop(ax);
pop(es);
iret();
