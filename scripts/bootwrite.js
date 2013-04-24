(function(){
    'use strict';
    
    var fs          = require('fs'),
        
        BOOT_FILE   = 'boot.bin',
        IMAGE_FILE  = 'nemizida.img',
        
        SUCCESS_MSG = 'Boot Record writed successfully.',
        
        OFFSET      = 0,
        POSITION    = 0;
    
    
    fs.readFile(BOOT_FILE, function(pError, pData){
        if( !show(pError) )
            fs.open(IMAGE_FILE, 'r+', function(pError, pFD){
                show(pError) || write(pFD, pData);
            });
    });
    
    function write(pFD, pData){
        fs.write(pFD, pData, OFFSET, pData.length, POSITION, function(pError){
            show(pError || SUCCESS_MSG);
        });
    }
    
    function show(pMsg){
        if(pMsg)
            console.log(pMsg);
        
        return pMsg;
    }
    
})();