States.Level1 = function ()
{
	this.UI = null;
	
	this.map = null;
	
	this.platforms = null;
	this.player = null;
	
    this.bullets = null;
    
    this.bouncer = null;
    this.flyer = null;
    
    this.cameraPoint = null;
    this.audio = null;
    
    this.endLevel = false;
    
    this.sparkle = null;
    this.spot = null;
}

States.Level1.prototype = {
	
	create:function()
	{
		this.stage.backgroundColor = "#00004d";
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
        this.initMusic();
        
		this.initTileMap();
		
        this.initEnnemies();
        
		this.initPlayer();
		
		this.initUI();
	},
	
	playerKilled:function()
	{
        if (this.endLevel == true) return;
        this.audio.playerDeath.play();
		Vars.lives--;
        Vars.score = 1000;
		
		var gameOver = false;
		
		if(Vars.lives == 0) gameOver = true;
		
		var transitionScreen = new UILevelInfos(this.game, true, gameOver);
		this.add.existing(transitionScreen);
        this.audio.level1.stop();
        this.audio.pose.stop();
		
		this.game.world.bringToTop(this.UI);
		
		if(gameOver) this.game.time.events.add(Phaser.Timer.SECOND * 3, this.endGame, this);
		else this.game.time.events.add(Phaser.Timer.SECOND * 3, this.restartLevel, this);
	},
	
	
	restartLevel:function()
	{
		this.game.state.start("Level1");	
	},
	
	endGame:function()
	{
		this.game.state.start("MainMenu");	
	},
    
    launchLevel2:function()
	{
        this.game.state.start("Level2");
	},
    
    initMusic:function()
    {
       this.audio = new Sound(this.game);
       this.audio.volume = 0.1;
       this.audio.level1.play();
       this.audio.pose.play();
    },
	
	/**************************
			UI
	***************************/
	
	initUI:function()
	{
		var transitionScreen = new UILevelInfos(this.game, false);
		this.add.existing(transitionScreen);
		
		this.UI = new UIGame(this.game);
		this.add.existing(this.UI);	
	},
	
	/**************************
			TILEMAP
	***************************/
	
	initTileMap:function()
	{
        var bg = this.game.add.image(0, 0, "bgHome");
        bg.fixedToCamera = true;
        
		this.map = this.add.tilemap("tm-level1");
	
		//param 1 - tileset name in Tiled
		//param 2 - tileset key in Phaser
		this.map.addTilesetImage("tiles");

		this.platforms = this.map.createLayer('platforms');
		this.map.setCollisionByExclusion([0]);
		this.platforms.resizeWorld();
        
        this.cameraPoint = new CameraPoint(this.game, 200, this.world.height/2, 130);
		this.add.existing(this.cameraPoint);
        this.camera.follow(this.cameraPoint, Phaser.Camera.FOLLOW_PLATFORMER);
	},
    
    
	/**************************
			ENNEMIES
	***************************/
    initEnnemies:function()
    {
		this.bouncer = this.add.group();
		
		this.map.createFromObjects('Bouncer', 'bouncer', null, null, true, false, this.bouncer, Bouncer);
        
        this.flyer = this.add.group();
		
		this.map.createFromObjects('Flyer', 'flyer', null, null, true, false, this.flyer, Flyer);
	
    },
    
    collideBouncer:function(_player, _target)
    {
    if (_player.invincible == false) _player.speed = -400;
    _player.damaged(100);
    },
    
    killBouncer:function(_target, _bullet)
    {
    this.audio.missileDeath.play();
    _target.pendingDestroy = true;
    Vars.score += 200;
    if (this.player.isPosing == true) Vars.score += 200;
    if (Vars.score < 3000) _bullet.pendingDestroy = true;
    },
    
    collideFlyer:function(_player, _target)
    {
    _player.damaged(200);
    },
    
    killFlyer:function(_target, _bullet)
    {
    this.audio.missileDeath.play();
    _target.pendingDestroy = true;
    Vars.score += 200;
    if (this.player.isPosing == true) Vars.score += 200;
    if (Vars.score < 3000) _bullet.pendingDestroy = true;
    },
	
	/**************************
			PLAYER
	***************************/
	
	initPlayer:function()
	{
		this.player = new Player(this.game, 80, 80);
		this.add.existing(this.player);
		
		this.player.events.onDestroy.add(this.playerKilled, this);
        
        this.bullets = this.add.group();
        
        this.game.onAddBulletSignal = new Phaser.Signal();
        this.game.onAddBulletSignal.add(this.onAddBulletFunction, this);
        
        this.spot = this.game.add.image(0, 0, 'spot');
        this.spot.anchor.set(0.5, 1);
        this.sparkle = this.game.add.sprite(0, 0, 'sparkle');
        this.sparkle.animations.add("shine", [0,1], 5, true);
        this.sparkle.animations.play('shine');
	},
	
    
    onAddBulletFunction:function(x, y, direction)
    {
    this.audio.pew.play();
    var bullet = new Bullet(this.game, x + 16, y - 24, direction);
    this.bullets.add(bullet);
    },
    
    collideBullet:function(_player, _target)
    {
    if (this.player.shield == false)
        {
        Vars.score += 200;
        _target.pendingDestroy = true;  
        }
    },
    
    updateEffect:function()
	{
    this.sparkle.x = this.player.x;
    this.sparkle.y = this.player.y;
        
    this.spot.x = this.player.x + 16;
    this.spot.y = this.player.y + 35;
        
    if (this.player.isPosing == true) this.sparkle.alpha = 1;
        else this.sparkle.alpha = 0;
    if (this.player.isPosing == true && Vars.score >= 3000) this.spot.alpha = 0.4;
        else this.spot.alpha = 0;
    
    if (this.player.isPosing == true) 
    {
    this.audio.level1.volume = 0;
    this.audio.pose.volume = 1
    }
        else
        {
        this.audio.level1.volume = 1;
        this.audio.pose.volume = 0;
        }
	},
	
    
    
	/**************************
			LOOP ENGINE
	***************************/
	update:function()
	{
		this.physics.arcade.collide(this.player, this.platforms);
		this.physics.arcade.collide(this.bouncer, this.platforms);
        this.physics.arcade.collide(this.bullets, this.platforms);
		
		if(!this.player.body) return;
        
		this.player.move();
		
		this.physics.arcade.overlap(this.player, this.bouncer, this.collideBouncer, null, this);
        this.physics.arcade.overlap(this.player, this.flyer, this.collideFlyer, null, this);
        this.physics.arcade.overlap(this.player, this.bullets, this.collideBullet, null, this);
        
        this.physics.arcade.overlap(this.bouncer, this.bullets, this.killBouncer, null, this);
        this.physics.arcade.overlap(this.flyer, this.bullets, this.killFlyer, null, this);
		
		if(this.player.bKilled) this.player.killed();
        
        if (this.player.x < this.camera.x-16)
        {
        this.player.killed();
        }
        
        if (this.player.isPosing == false)
        {
        Vars.score -= 1;
        }
        
        else if (this.player.isPosing == true)
        {
        Vars.score += 10;
        }
        
        this.updateEffect();
        
        if (this.cameraPoint.x >= 6200)
        {
        this.endLevel = true;
        var transitionScreen = new UILevelInfos(this.game, true, false, "Steam Town");
		this.add.existing(transitionScreen);
		
        this.audio.level1.stop();
        this.audio.pose.stop();
        
		this.game.time.events.add(Phaser.Timer.SECOND * 3, this.launchLevel2, this); 
        }
	}
}