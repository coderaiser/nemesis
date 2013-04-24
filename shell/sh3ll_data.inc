hi                  db      'H1, 1''m sh3ll.type h3lp for ',\
                            'more information', $d, 0
prompt              db      ']', 0
_cmd_buff           rb      _cmd_size + 1
cmd_help            db      'help',0
cmd_reboot          db      'reboot',0
cmd_dir             db      'dir',0
cmd_cls             db      'cls',0
cmd_сolor           db      'color',0
command_not_found   db      $d, \
                            'command not found o_O',$d,$d,0
cmd_list            db      $d, 'Help? Why not o_O?',$d,\
                            'help   - show this screen ;)',$d,\
                            'dir    - show the files in dir ',\
                            'where you now',$d,\
                            'cls    - will clear the screen',$d,\
                            'reboot - reboot the computer',$d,\
                            'color  - change text and ',\
                            'background color',$d,$d,0

color_help          db	    $d,'type: c0l0r bt',$d,\
                            'where b - it''s bgcolor and ',\
                            't - text color',$d,\
                            'one of:',$d,\
                            '0 = black     8 = gray',$d,\
                            '1 = dark blue 9 = light blue',$d,\
                            '2 = green     a = light green',$d,\
                            '3 = blue      b = light blue',$d,\
                            '4 = red       c = light red',$d,\
                            '5 = violet    d = light violet',$d,\
                            '6 = yellow    d = light yellow',$d,\
                            '7 = white     f = light white',$d,$d,0
