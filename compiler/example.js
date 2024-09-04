import {
    line,
    col,
    bgcolor,
    textcolor,
} from './a.js';

org['7c00h'];
use16();
boot: jmp.short.start();

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
