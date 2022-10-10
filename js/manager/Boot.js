var States = {};

var FontStyle = {};
FontStyle.fs1 = {font:'16px "PressStart2P"', fill:'#fff'};
FontStyle.fs1Right = {font:'16px "PressStart2P"', fill:'#fff', align:"right"};
FontStyle.fsNintendo = {font:'16px "PressStart2P"', fill:'#fcbcb0', align:"right"};

var Vars = {};
Vars.startLives = 3;
Vars.lives = 0;
Vars.score = 1000;
Vars.startScore = 1000;

window.onload = function()
{
	var game = new Phaser.Game(720, 480, Phaser.AUTO, 'game-container');
	
	game.state.add("Preloader", States.Preloader);
    game.state.add("Launcher", States.Launcher);
	game.state.add("MainMenu", States.MainMenu);
	game.state.add("Level1", States.Level1);
    game.state.add("Level2", States.Level2);
    game.state.add("Level3", States.Level3);
    
	game.state.start("Launcher");
}