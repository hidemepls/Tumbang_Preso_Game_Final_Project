var menu = {
	create:function(){
		game.add.sprite(0,0,'bg2');
		playbtn = game.add.button(160,200,'playbtn',this.playG);
		title = game.add.text(100,80,'TUMBANG PRESO',{font :'50px Cooper',fill:'#ff0000'});
		// press = game.add.text(50,game.height - 100, 'Press \"SPACEBAR\" to Start.',{font:'40px Arial',fill:'#fff' });
		console.log('MENU');
	},
	
	playG:function(){
		if(playbtn){
			game.state.start('play');
		}
	},

	update:function(){
		if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('play')
		}
	}
}