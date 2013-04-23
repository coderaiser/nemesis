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
            wget http://flatassembler.net/fasm-1.70.03.tgz
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
    else
        FILE_EXIST=`ls -al | grep dosfstools`
        if [ "$FILE_EXIST" == "" ]
          then
            wget http://daniel-baumann.ch/files/software/dosfstools/dosfstools-3.0.16.tar.gz
            tar -zxf dosfstools*.tar.gz    
            cd dosfstools*
            make
            cd ..
        fi
        mkdosfs="dos*/mkdosfs"
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
            cd mtools*
            ./configure && make
            cd ..
        fi
        mcopy="mtools*/mcopy"
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
echo '>compile fat12boot'
$fasm fat12boot.asm
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
$node scripts/write_boot_sector.js

echo "Image \"nemizida.img\" created."