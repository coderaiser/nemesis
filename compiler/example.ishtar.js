// a.js
var line = 3;
var col = 0;
var textcolor = 2;
var bgcolor = 0;

// example.js
var ah = [textcolor];

use16();
jmp.short.start();
rb(512 - $ - boot - 2);
db.bpbOEM = 'nemesis ';
dw.bpbSectSize = 512;
equ(kernel_begin, 32_256);
xor(ax, ax);
push(es);
push(ax);
push(di);
ax = 47_104;
mov(es, ax);
xor(ax, ax);
mov(ah, [bgcolor]);
shl(ah, 4);
xor(di, 0);
mov(cx, 25 + 80);
rep.stosw();
mov([line], 0);
mov([col], 0);
pop(di);
pop(ax);
pop(es);
iret();
