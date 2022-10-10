var Bullet = function(game, x, y, direction, type)
{
	Phaser.Sprite.call(this, game, x, y, "bullet");
    
	this.init(direction);
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.init = function(direction)
{
    this.game.physics.arcade.enable(this);
    
    this.body.collideWorldBounds = true;
    
	//set params to player body
	this.body.velocity.x = 400 * direction;
    this.body.velocity.y = 200;
    
    this.body.bounce.y = 1;
    this.body.bounce.x = 1;
}

Bullet.prototype.update = function(direction)
{
if (this.body.x < this.game.camera.x-32)
{
this.destroy();
return;
}
    
if (this.body.x > this.game.camera.x + this.game.camera.width+32)
{
this.destroy();
}
}