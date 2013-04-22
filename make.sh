#/bin/sh

FILE_EXIST=`ls -al | grep fasm`
if [ "$FILE_EXIST" == "" ]
  then
    wget http://flatassembler.net/fasm-1.70.03.tgz
    mv fasm*tgz fasm.tar.gz
    tar -zxf fasm.tar.gz
fi

#compile
fasm/fasm fat12boot.asm
fasm/fasm kernel/kernel.asm
fasm/fasm shell/sh3ll.asm

FILE_EXIST=`ls -al | grep dosfstools`
if [ "$FILE_EXIST" == "" ]
  then
    wget http://daniel-baumann.ch/files/software/dosfstools/dosfstools-3.0.16.tar.gz
    tar -zxf dosfstools*.tar.gz    
    cd dosfstools*
    make
    cd ..
fi

#copy boot record
dd if=fat12boot.bin of=nemizida.img

#making floppy image
dd if=/dev/zero of=nemizida.img bs=512 count=2879 seek=1

dos*/mkdosfs nemizida.img

FILE_EXIST=`ls -al | grep mtools`
if [ "$FILE_EXIST" == "" ]
  then
    wget ftp://ftp.gnu.org/gnu/mtools/mtools-4.0.18.tar.gz
    tar -zxf mtools*.tar.gz
    cd mtools*
    ./configure && make
    cd ..
fi

#copy kernel and shell
mtools*/mcopy -i nemizida.img kernel/kernel.bin ::/ 
mtools*/mcopy -i nemizida.img shell/sh3ll.bin ::/ 