var w = 600;
var h = 800;
var loading;
var title;
var press;
var keyboard;
var char;
var lata;
var pamatos;
var pamatoTime = 0;
var lrespawnTime = 1000;
var bg;
var bilog;
var charot;
var scoreText;
var bestText;
var latas;
var score = 0;
var best = 0;
var scoreString = '';
var getBest;
var saveBest;
var platform;
var charotSpeed = 0;
var pauseLabel;
var chances;
var stateText;
var latasound;
var throwfx;
var loopCount = 0;
var game = new Phaser.Game(w,h,Phaser.CANVAS,'');

game.state.add('boot',boot);
game.state.add('load',load);
game.state.add('menu',menu);
game.state.add('play',play);


game.state.start('boot');