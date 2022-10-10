var Player = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, "proton");
	
	this.speed = 0;
	this.speedMax = 180;
	
	this.inertie = 10;
    
    this.inertieSlide = 5;
	
	this.bOnFloor = false;
	
	this.cursors = null;
	
	this.bKilled = false;
    
    this.spaceKey = null;
    
    this.isPosing = false;
	
    this.shoot = null;
    this.cooldown = true;
    this.shield = false;
    
    this.invincible = false;
    this.isStunned = false;
    
    this.damageSound = null;
    this.direction = 1;
    
	this.init();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.init = function()
{
	console.log("INIT player");
	
	this.game.physics.arcade.enable(this);
	
    this.damageSound = this.game.add.audio('damaged');
    
	this.body.setSize(22, 32, 6, 0);
	
	//set params to player body
	this.body.gravity.y = 800;
	
	this.body.collideWorldBounds = false;
	
	this.animations.add("left", [0, 1, 2, 3], 10, true);
	this.animations.add("right", [6, 7, 8, 9], 10, true);
	
	this.frame = 6;
	
	this.cursors = this.game.input.keyboard.createCursorKeys();
    this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

Player.prototype.killed = function()
{
this.destroy();
}

Player.prototype.damaged = function(damage)
{
if (!this.invincible)
    {
    this.damageSound.play();
    Vars.score -= Vars.score / 3;
    Vars.score -= (damage);
    Vars.score = Math.round(Vars.score);
    this.invincible = true;
    if (Vars.score <= 0) this.killed;

    var tweenA = this.game.add.tween(this).to( { alpha:0 }, 50, Phaser.Easing.Linear.None, true, 0, 10, true);
    tweenA.onComplete.add(function(){this.invincible = false}, this);
    
    this.isStunned = true;
    this.game.time.events.add(Phaser.Timer.SECOND / 2, this.unStun, this);   
    }
}

Player.prototype.unStun = function()
{
 this.isStunned = false;   
}


Player.prototype.move = function()
{
    this.bOnFloor = false;
	
	if(this.body.touching.down || this.body.blocked.down) this.bOnFloor = true;
    
    if (this.isStunned == true)
        {
        this.idle();
        this.body.velocity.x = this.speed;
        return;
        }
    
    if (this.cursors.down.isDown && this.bOnFloor == true)
        {
        this.sliding();
        this.body.velocity.x = this.speed;
        this.pose();
        return;
        }
    else this.isPosing = false;
    
	if(this.y >= this.game.world.height - this.body.height)
	{
		this.killed();
		return;
	}
    
    if(Vars.score <= 0)
	{
		this.killed();
		return;
	}
    
    if(this.shoot.isDown && this.cooldown)
    {
        if (Vars.score >= 500) this.fire();
    }
    
	this.bOnFloor = false;
	
	if(this.body.touching.down || this.body.blocked.down) this.bOnFloor = true;
	
	if(this.cursors.left.isDown) this.walkLeft();
	else if(this.cursors.right.isDown) this.walkRight();
	else this.idle();
	
	this.body.velocity.x = this.speed;
	
	if(this.cursors.up.isDown) this.jump();
    
    this.animate();
}

Player.prototype.animate = function()
{
if (this.speed < -10) this.animations.play("left");
if (this.speed > 10) this.animations.play("right");
    
if (this.body.velocity.y > 0) this.frame = 12;
if (this.body.velocity.y < 0) this.frame = 13;

if (this.body.blocked.right) this.frame = 11;
if (this.body.blocked.left) this.frame = 5;
}

Player.prototype.fire = function()
{
    this.shield = true;
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.unShield, this);
     this.game.onAddBulletSignal.dispatch(this.x, this.y, this.direction);  
    Vars.score -= 200;
     this.cooldown = false;
    if (Vars.score >= 1500) this.game.time.events.add(Phaser.Timer.SECOND * 1, this.bulletTimer, this);
        else this.game.time.events.add(Phaser.Timer.SECOND * 2, this.bulletTimer, this);   
}

Player.prototype.bulletTimer = function()
{
this.cooldown = true;
}

Player.prototype.unShield = function()
{
this.shield = false;
}


Player.prototype.jump = function()
{
    //Normal jump
    if (this.bOnFloor == true)
    {
    this.body.velocity.y = -400;
	this.animations.stop();  
    }
    //Wall jump to the left <--
    else if (this.body.blocked.right && this.cursors.left.isDown)
    {
    this.body.velocity.y = -300
    this.speed = -300;
    }
    //Wall jump to the right -->
    else if (this.body.blocked.left && this.cursors.right.isDown)
    {
    this.body.velocity.y = -300
    this.speed = 300;
    }

	if(this.frame <=5) this.frame = 0;
	else this.frame = 11;
}

Player.prototype.walkLeft = function()
{
	if(this.speed > -this.speedMax) this.speed -= this.inertie;
    this.direction = -1;
}

Player.prototype.walkRight = function()
{
	if(this.speed < this.speedMax) this.speed += this.inertie;
    this.direction = 1;
}

Player.prototype.pose = function()
{
this.animations.stop();
this.frame = 14;
this.isPosing = true;
}

Player.prototype.unPose = function()
{
this.isPosing = false;
}

Player.prototype.idle = function()
{
	if(this.speed > 0) {
		this.speed -= this.inertie;
	}
	else if(this.speed < 0) {
		this.speed += this.inertie;
	} else {
		this.animations.stop();

		if(this.bOnFloor) 
        {
            if (this.frame >= 6) this.frame = 10;
            else
            this.frame = 4;
		}
	}
}

Player.prototype.sliding = function()
{
	if(this.speed > 0) {
		this.speed -= this.inertieSlide;
	}
	else if(this.speed < 0) {
		this.speed += this.inertieSlide;
	}
	
}
