var load = {
	preload:function(){
		var dir = 'img/';
		game.load.image('leftie',dir + 'btns(l).png');
		game.load.image('rightie',dir + 'btns(r).png');
		game.load.image('platform',dir + 'platform(a).png');
		game.load.image('bg',dir + 'bg.png');
		game.load.image('bg2',dir + 'bg2.png');
		game.load.image('bilog', dir + 'bilog.png');
		game.load.image('lata',dir + 'lata.png');
		game.load.image('char',dir + 'char.png');
		game.load.spritesheet('pamato',dir + 'tsinelas.png',108,108);
		game.load.spritesheet('charot', dir + 'charot.png',152,209);
		game.load.image('throw',dir + 'throw_btn.png');
		game.load.image('playbtn',dir + 'play.png')
	},
	create:function(){
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;	

		game.add.sprite(0,0,'bg2');
		game.input.onDown.add(this.gofull , this);
		keyboard = game.input.keyboard;
	},

	gofull:function(){
		game.scale.startFullScreen(false);
	},
	update:function(){
		loading = game.add.text(150,400,'Tap Anywhere To Start',{font :'30px Cooper', fill:'#ff0000'});
		game.input.onTap.addOnce(this.loaded,this);

		},
	loaded:function(){
		game.state.start('menu');
		console.log('LOADED')	
	}
	}