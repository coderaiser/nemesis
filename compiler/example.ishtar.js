// a.js
var line = 3;
var col = 0;
var textcolor = 2;

// example.ts
use16();
jmp.short.start();
rb(512 - $ - boot - 2);
db.bpbOEM = "nemesis ";
dw.bpbSectSize = 512;
equ(kernel_begin, 32256);
ax ^= ax;
push([
  es,
  ax,
  di
]);
ax = 47104;
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
  es
]);
iret();
write();
function write() {
  mov(ax, 3);
  int(255);
}
