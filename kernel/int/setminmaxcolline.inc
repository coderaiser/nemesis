setminmaxcolline:;bl=min col,bh-min line
		 ;cl=max col,ch=max line
	mov	[mincol],bl
	mov	[maxcol],cl
	mov	[minline],bh
	mov	[maxline],ch
	iret
