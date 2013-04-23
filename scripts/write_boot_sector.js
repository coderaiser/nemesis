(function(){
    'use strict';
    
    var fs          = require('fs'),
        
        OFFSET      = 0,
        POSITION    = 0;
    
    
    fs.readFile('fat12boot.bin', function(pError, pData){
        if(pError)
            console.log(pError);
        else
            fs.open('nemizida.img', 'r+', function(pError, pFD){
                if(pError)
                    console.log(pError);
                else
                    fs.write(pFD, pData, OFFSET, pData.length, POSITION, function(pError){
                        if(pError)
                            console.log(pError);
                        else
                            console.log('Boot Record writed successfully');
                    });
            });
    });
    
})();