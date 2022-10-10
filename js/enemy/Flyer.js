var Flyer = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, "flyer");
	
	this.speed = -100;
	
	this.init();
}

Flyer.prototype = Object.create(Phaser.Sprite.prototype);
Flyer.prototype.constructor = Flyer;

Flyer.prototype.init = function()
{
	this.game.physics.arcade.enable(this);
	
	this.animations.add("walk", [0, 1], 5, true);
	this.animations.play("walk");
}

Flyer.prototype.killedByPlayer = function()
{
	this.destroy();
}

Flyer.prototype.update = function()
{
    if (this.body.x > this.game.camera.x-32 && this.body.x < this.game.camera.x + this.game.camera.width+32)
	{     
        if(this.body.blocked.left || this.body.blocked.right)
        {
            this.speed *= -1;
        }
        this.body.velocity.x = this.speed;
    }
}