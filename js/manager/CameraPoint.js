var CameraPoint = function(game, x, y, speed)
{
	Phaser.Sprite.call(this, game, x, y, "void");
	
	this.init(speed);
}

CameraPoint.prototype = Object.create(Phaser.Sprite.prototype);
CameraPoint.prototype.constructor = CameraPoint;

CameraPoint.prototype.init = function(speed)
{
	this.game.physics.arcade.enable(this);
	
	//set params to player body
	this.body.velocity.x = speed;
	
	this.body.collideWorldBounds = true;
}