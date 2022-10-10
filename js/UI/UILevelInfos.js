var UILevelInfos = function(game, fadeIn = false, gameOver = false, textLvl = "")
{
	Phaser.Group.call(this, game);
	
	this.init(fadeIn, gameOver, textLvl);
}

UILevelInfos.prototype = Object.create(Phaser.Group.prototype);
UILevelInfos.prototype.constructor = UILevelInfos;

UILevelInfos.prototype.init = function(fadeIn, gameOver, textLvl)
{
	this.fixedToCamera = true;
	
	var bg = this.game.add.graphics(0, 0);
	bg.beginFill(0x000000);
	bg.drawRect(0, 0, this.game.camera.view.width, this.game.camera.view.height);
	this.add(bg);
	
	var centerH = this.game.camera.view.height/2;
	var centerW = this.game.camera.view.width/2;
    
    var UIlifeText = this.game.add.text(centerW, centerH, "X " + Vars.lives, FontStyle.fs1);
	this.add(UIlifeText);
    
    var lifeIcon = this.game.add.image(centerW - 50,centerH, 'life Icon');
    this.add(lifeIcon);
	
	if(gameOver)
	{
		var over = this.game.add.text(centerW, centerH - 80, "GAME OVER", FontStyle.fs1);
		over.anchor.setTo(0.5, 0);
		this.add(over);
	} else {
		var world = this.game.add.text(centerW, centerH - 80, "" + textLvl, FontStyle.fs1);
		world.anchor.setTo(0.5, 0);
		this.add(world);
	}
	
	
	
	if(fadeIn)
	{
		var tweenIn = this.game.add.tween(this);
		tweenIn.from({alpha:0}, 500, Phaser.Easing.Quartic.Out, true);
	} else
	{
		var tweenOut = this.game.add.tween(this);
		tweenOut.to({alpha:0}, 500, Phaser.Easing.Quartic.Out, true);
		
		tweenOut.onComplete.add(this.destroy, this);
	}	
}