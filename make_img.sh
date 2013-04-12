#download fasm and complie nemizida sources
wget http://flatassembler.net/fasm-1.70.03.tgz
wget http://prdownloads.sourceforge.net/dosemu/dosemu-1.4.0-bin.tgz?download
mv fasm*tgz fasm.tar.gz
tar zxf dosemu*tgz
tar -zxf fasm.tar.gz
fasm/fasm fat12boot.asm
fasm/fasm kernel/kernel.asm
fasm/fasm shell/shell.asm
