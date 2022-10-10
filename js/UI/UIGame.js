var UIGame = function(game, fade = false)
{
	Phaser.Group.call(this, game);
	
	this.UIScoreText = null;
    this.UIBullet = null;
    this.UICD = null;
    this.UIPierce = null;
	
	this.init(fade);
}

UIGame.prototype = Object.create(Phaser.Group.prototype);
UIGame.prototype.constructor = UIGame;

UIGame.prototype.init = function(fade)
{
	this.fixedToCamera = true;
	
	this.cameraOffset.y = 20;
	this.cameraOffset.x = this.game.camera.view.width/2;
	
	//UI SCORE
	var titre = this.game.add.text(-100, 0, "Energy : ", FontStyle.fs1);
	this.add(titre);
    
    this.UIBullet = this.game.add.image(120, -10, 'UIBullet');
    this.add(this.UIBullet);
    
    this.UICD = this.game.add.image(152, -10, 'UICD');
    this.add(this.UICD);
    
    this.UIPierce = this.game.add.image(184, -10, 'UIPierce');
    this.add(this.UIPierce);
	
	this.UIScoreText = this.game.add.text(50, 0, "000000", FontStyle.fs1);
	this.add(this.UIScoreText);
	
	if(fade)
	{
		var tweenIn = this.game.add.tween(this);
		tweenIn.from({alpha:0}, 500, Phaser.Easing.Quartic.Out, true, 1000);
	}
}

UIGame.prototype.update = function(fade)
{
	this.UIScoreText.text = "" + Vars.score;
        if (Vars.score >= 500) this.UIBullet.alpha = 1;
    else this.UIBullet.alpha = 0;
    
        if (Vars.score >= 1500) this.UICD.alpha = 1;
    else this.UICD.alpha = 0;
    
        if (Vars.score >= 3000) this.UIPierce.alpha = 1;
    else this.UIPierce.alpha = 0;
}