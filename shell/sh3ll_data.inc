;data
hi		  db	  'H1, 1''m sh3ll.type h3lp for ',\
			  'm0r3 1nf0rm4t10n',$d,0
prompt		  db	  ']',0
_cmd_buff	  rb	  _cmd_size+1
cmd_help	  db	  'h3lp',0
cmd_reboot	  db	  'r3b00t',0
cmd_dir 	  db	  'd1r',0
cmd_cls 	  db	  'cls',0
cmd_сolor	  db	  'c0l0r',0
command_not_found db	  $d,\
			  'command not found o_O',$d,$d,0
cmd_list	  db	  $d,'Help? Why not o_O?',$d,\
			  'h3lp   - show this screen ;)',$d,\
			  'd1r    - show the files in dir ',\
			  'where you now',$d,\
			  'cls    - will clear the screen',$d,\
			  'r3b00t - reboot the computer',$d,\
			  'c0l0r  - change text and ',\
			  'background color',$d,\
			  'n4m3   - exec program with n4m3 ',\
			  'of program in dir, wher you are ',\
			  'now',$d,$d,0
color_help	  db	  $d,'type: c0l0r bt',$d,\
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
