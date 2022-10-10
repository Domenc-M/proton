var Sound = function(game)
{
	Phaser.Group.call(this, game);
    
    this.menu = null;
    this.level1 = null;
    this.level2 = null;
    this.level3 = null;
    this.pose = null;
    this.ennemyDeath = null;
    this.playerDeath = null;
    this.playerDamage= null;
    this.missileDeath = null;
    this.pew = null;
    
	this.init(game);
}

Sound.prototype = Object.create(Phaser.Group.prototype);
Sound.prototype.constructor = Sound;

Sound.prototype.init = function(game)
{
this.level1 = game.add.audio('lvl1music')
this.level2 = game.add.audio('lvl2music')
this.level3 = game.add.audio('lvl3music')
this.pose = game.add.audio('posemusic')

this.playerDeath = game.add.audio('death')
this.missileDeath = game.add.audio('missileDie')
this.pew = game.add.audio('pew')
}