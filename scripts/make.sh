#/bin/sh

echo '>check fasm'
echo '----------------------------------'
if which fasm
    then
        fasm='fasm'
    else
        FILE_EXIST=`ls -al | grep fasm`
        if [ "$FILE_EXIST" == "" ]
          then
            wget https://flatassembler.net/fasm-1.73.32.tgz
            mv fasm*tgz fasm.tar.gz
            tar -zxf fasm.tar.gz
        fi
        fasm="fasm/fasm"
    fi

echo '>check mkdosfs'
echo '----------------------------------'
if which mkdosfs
    then
        mkdosfs="mkdosfs"
        dosfsck="dosfsck"
    else
        FILE_EXIST=`ls -al | grep dosfstools`
        if [ "$FILE_EXIST" == "" ]
          then
            wget https://github.com/dosfstools/dosfstools/releases/download/v4.2/dosfstools-4.2.tar.gz
            tar -zxf dosfstools-4.2.tar.gz    
            cd dosfstools-4.2
            make
            cd ..
        fi
        mkdosfs="dosfstools-4.2/mkdosfs"
        dosfsck="dosfstools-4.2/dosfsck"
    fi

echo '>check mcopy'
echo '----------------------------------'
if which mcopy
    then
        mcopy="mcopy"
    else
        FILE_EXIST=`ls -al | grep mtools`
        if [ "$FILE_EXIST" == "" ]
          then
            wget ftp://ftp.gnu.org/gnu/mtools/mtools-4.0.18.tar.gz
            tar -zxf mtools*.tar.gz
            cd mtools-4.0.18
            ./configure && make
            cd ..
        fi
        mcopy="mtools-4.0.18.tar.gz/mcopy"
    fi

echo '>check node'
echo '----------------------------------'
if which node
    then
        node="node"
    else
        FILE_EXIST=`ls -al | grep node`
        if [ "$FILE_EXIST" == "" ]
          then
            wget http://nodejs.org/dist/v0.10.4/node-v0.10.4.tar.gz
            tar -zxf node*.tar.gz
            cd node*
            ./configure && make
            cd ..
        fi
        node="node*/node"
    fi

#compile
echo '>compile boot.asm'
$fasm boot.asm
echo '>compile kernel'
$fasm kernel/kernel.asm
echo '>compile shell'
$fasm shell/sh3ll.asm
echo '----------------------------------'
#making floppy image
dd if=/dev/zero of=nemizida.img bs=512 count=2880
$mkdosfs nemizida.img

#write kernel and shell
$mcopy -i nemizida.img kernel/kernel.bin ::/ 
$mcopy -i nemizida.img shell/sh3ll.bin ::/ 
echo '----------------------------------'
#write boot record
$node ./scripts/bootwrite.js

dd if=nemizida.img of=nemizida_small.img bs=512 count=40

#check result image
$dosfsck nemizida.img

echo "Image \"nemizida.img\" created."
