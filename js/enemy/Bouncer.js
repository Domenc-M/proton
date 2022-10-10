var Bouncer = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, "bouncer");
	
	this.speed = -50;
	
	this.init();
}

Bouncer.prototype = Object.create(Phaser.Sprite.prototype);
Bouncer.prototype.constructor = Bouncer;

Bouncer.prototype.init = function()
{
	this.game.physics.arcade.enable(this);
	
	//set params to player body
	this.body.gravity.y = 800;
	
	this.animations.add("walk", [0, 1], 5, true);
	this.animations.play("walk");
}

Bouncer.prototype.killedByPlayer = function()
{
	this.destroy();
}

Bouncer.prototype.update = function()
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