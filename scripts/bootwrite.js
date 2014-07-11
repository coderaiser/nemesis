(function(){
    'use strict';
    
    var fs          = require('fs'),
        
        BOOT_FILE   = 'boot.bin',
        IMAGE_FILE  = 'nemizida.img',
        
        SUCCESS_MSG = 'Boot Record writed successfully.',
        
        OFFSET      = 0,
        POSITION    = 0;
    
    
    fs.readFile(BOOT_FILE, function(error, data) {
        if (error)
            show(error);
        else
            fs.open(IMAGE_FILE, 'r+', function(error, fd) {
                if (error)
                    show(error);
                else
                    write(fd, data);
            });
    });
    
    function write(fd, data){
        fs.write(fd, data, OFFSET, data.length, POSITION, function(error) {
            show(error || SUCCESS_MSG);
        });
    }
    
    function show(pMsg){
        if(pMsg)
            console.log(pMsg);
        
        return pMsg;
    }
    
})();