// a.js
var line = 3;
var col = 0;
var textcolor = 2;
var bgcolor = 0;

// example.js
use16();
jmp.short.start();
db.bpbOEM = "nemesis ";
dw.bpbSectSize = 512;
equ(kernel_begin, 32256);
start: {
  xor(ax, ax);
  push(es);
  push(ax);
  push(di);
  mov(ax, 47104);
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
}
