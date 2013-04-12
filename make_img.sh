#download fasm and complie nemizida sources
wget http://flatassembler.net/fasm-1.70.03.tgz
mv fasm*tgz fasm.tar.gz
tar -zxf fasm.tar.gz
fasm/fasm fat12boot.asm
fasm/fasm kernel/kernel.asm
fasm/fasm shell/shell.asm
