var $;
(function(){
    'use strict';
    
    var $run        = $('#run'),
        $reset      = $('#reset'),
        $loading    = $('.loading'),
        $screen     = $('#screenVGA');
            
    $run.bind('click', firstRun);
    $screen.bind('click', firstRun);
    
    function firstRun(){
        $run.unbind('click', firstRun);
        $screen.unbind('click', firstRun);
        
        $run[0].classList.add('hidden');
        $reset[0].classList.remove('hidden');
        $loading[0].classList.remove('hidden');
        
        require([
              'js/core/classes/emulator'
              , 'js/plugins/std.canvas.vga'
              , 'js/plugins/std.keyboard'
          ], function (
              Jemul8
              , canvasVGAPlugin
              , keyboardPlugin
          ) {
              $(function () {
                $loading[0].classList.add('hidden');
                
                var emu = new Jemul8( {
                      'floppy0.driveType':
                          'FDD_350HD'
                      , 'floppy0.diskType':
                          'FLOPPY_1_44'
                      , 'floppy0.path':
                          'nemizida_small.img'
                      , 'floppy0.status': true
                } );
                  
                canvasVGAPlugin.applyTo(emu);
                keyboardPlugin.applyTo(emu);
                 
                emu.init(function () {
                    $reset.click(function ( evt ) {
                        emu.reset();
                        emu.run();
                    });
                  }, function () {
                      // Load failed
                  });
              });
          });
    }
})();
