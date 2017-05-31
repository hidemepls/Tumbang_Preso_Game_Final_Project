var play = {
	create:function(){
		game.add.sprite(0,0,'bg');
		bilog = game.add.sprite(300,220,'bilog');
		bilog.anchor.setTo(0.5,0.5);
	
		bato = game.add.button(450,700,'throw', this.actionOnClick, this, 2, 1, 0);
		leftie = game.add.button(0,700,'leftie',this.leftC);
		rightie = game.add.button(200,700,'rightie',this.rightC);


		pamatos = game.add.group();
		pamatos.enableBody = true;
		pamatos.physicsBodyType = Phaser.Physics.ARCADE;
		pamatos.createMultiple(30, 'pamato');
		pamatos.setAll('anchor.x', 0.5);
		pamatos.setAll('anchor.y', 1);
		pamatos.setAll('outOfBoundsKill', true);
		pamatos.setAll('checkWorldBounds', true);	

		latas = game.add.group();
		latas.enableBody = true;
		latas.physicsBodyType = Phaser.Physics.ARCADE;

		platform = game.add.sprite(300,295,'platform');
		platform.anchor.setTo(0.5,0.5);
		platform.enableBody = true;

		charots = game.add.group();
		charots.enableBody = true;
		charots.physicsBodyType = Phaser.Physics.ARCADE;

		char = game.add.sprite(300,716,'char');
		char.anchor.setTo(0.5,0.5);
		char.enableBody = true;
		this.createCharots();
		this.createLatas();
		game.physics.enable(char, Phaser.Physics.ARCADE);
		char.body.collideWorldBounds = true;

		chances = game.add.group();
		game.add.text(470,10,'PAMATO :',{font:'24px Cooper',fill:'#00ffff'});
		for (var i = 0; i < 3; i++) 
   	 	{
        var pamato = chances.create(480 + (45 * i), 85, 'pamato');
        pamato.anchor.setTo(0.5, 0.5);
        pamato.angle = 0;
        pamato.alpha = 0.5;
  	  	}
		char.scale.x=0.4;
		char.scale.y=0.4;
		bilog.scale.x=0.3;
		bilog.scale.y=0.3;

		scoreString = 'SCORE : ';
		stateText = game.add.text(300,350,' ', { font: '30px Cooper', fill: '#ff0000' });
    	stateText.anchor.setTo(0.5, 0.5);
    	stateText.visible = false;
		scoreText = game.add.text(10,10,scoreString + score ,{font: '30px Cooper', fill: '#00ffff'});
		bestText = game.add.text(10,40,'BEST :'+this.getBest(),{font: '30px Cooper', fill: '#00ffff'});
		
		console.log('PLAYING');
	},
	createCharots:function() {
        for (var x = 0; x < 1; x++){
           var charot = charots.create(-100,190, 'charot');
            charot.anchor.setTo(0.5, 0.5);
            charot.body.moves = false;
            charot.animations.add('guard',[0,1,2,3],10,true);
            charot.play('guard');
            charot.body.moves = false;
        }	
        charot.x = 100;
        var tween = game.add.tween(charots).to( { x: 400 }, 1300, Phaser.Easing.Linear.None, true, 0, 1000, true);
		tween.onLoop.add(this.faster, this);
	},
	faster:function(){
		charot.x +=1;
	},	

	createLatas:function() {
	if(game.time.now > lrespawnTime){
        for (var x = 0; x < 1; x++){
           var lata = latas.create(300,190, 'lata');
            lata.anchor.setTo(0.5, 0.5);
            lata.body.moves = false;
        	lrespawnTime = game.time.now + 2000;
        	}	
    	}   
	},

	fireBullet:function () {
    if (game.time.now > pamatoTime)
    {
        var pamato = pamatos.getFirstExists(false);

        if(pamato){
            pamato.reset(char.x + 70, char.y + 80);
            pamato.animations.add('thrown',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],10,true);
            pamato.animations.play('thrown');
            pamato.body.velocity.y = -400;
            pamatoTime = game.time.now + 2000;
        }
    }
	},

	leftC:function(button){
		if(leftie){
		char.body.velocity.x= -200;
		}
	},

	rightC:function(button){
		if (rightie){
		char.body.velocity.x= 200;
		}
	},

	actionOnClick:function(){
		this.fireBullet();
	},

	update:function(){
		game.physics.arcade.overlap(latas,pamatos,this.scoring,null,this);
		game.physics.arcade.overlap(pamatos,charots,this.gameOver,null,this);
		
		char.body.velocity.setTo(0,0);

		if(keyboard.isDown(Phaser.Keyboard.A)){
			char.body.velocity.x= -200;
		}
		if(keyboard.isDown(Phaser.Keyboard.D)){
			char.body.velocity.x= 200;
		}
		if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.fireBullet();
		}
	},

	saveBest:function(value){
		localStorage.setItem('gameStorage',value);
	},
	getBest:function(){
		return ((localStorage.getItem('gameStorage') == null)||(localStorage.getItem('gameStorage') == ""))?0:localStorage.getItem('gameStorage');
	},

	scoring:function(pamato,lata){
		pamato.kill();
		lata.kill();
		score = score + 1;
		scoreText.text = scoreString + score;
		this.createLatas();
		if (this.getBest()<score){
			this.saveBest(score);
			bestText.text='BEST :' + this.getBest();
		}
		
	},
	gameOver:function(pamato,charots){
		pamato.kill();
		chance = chances.getFirstAlive();
		if(chance){
			chance.kill();
		}
		if(chances.countLiving() < 1){
		chance.kill();

		stateText.text='GAME OVER \n Your Score :' + score + '\nClick to Restart';
		stateText.visible =true;

		game.input.onTap.add(this.restart,this);

		}

	},
	restart:function(){
	score = 0;
	game.state.start('play');
	stateText.visible = false;
	}
}