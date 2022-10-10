States.Preloader = function ()
{
	this.preloadBar = null;
}

States.Preloader.prototype = {
	
	init:function()
	{
		//game -> this
		//nous sommes dans un etat du jeu
		//la reference au game passe donc maintenant par la
		//clef this et non plus par une variable
		
		var loader = this.add.group();
		
        var Protonback = this.game.add.image(0, 0, "loadDown");
        loader.add(Protonback);
		
		this.preloadBar = this.add.graphics(0, 0);
		this.preloadBar.beginFill(0x00CCFF);
		this.preloadBar.drawRect(0, 0, 256, 256);
		loader.add(this.preloadBar);
        
        var Protonfront = this.game.add.image(0, 0, "loadUp");
        loader.add(Protonfront);
		
		loader.x = this.stage.width/2 - loader.width/2;
		loader.y = this.stage.height/2 - loader.height/2;
	},
	
	preload:function()
	{
		var nocach = Math.random();
		//load an image with phaser loader
        
		this.load.image('logo', 'assets/logo.png?'+nocach);
        this.load.image('howTo', 'assets/HowtoPlay.png?'+nocach);
		this.load.image('bgHome', 'assets/background.png?'+nocach);
        this.load.image('bgHome2', 'assets/background2.png?'+nocach);
        this.load.image('bgHome3', 'assets/background3.png?'+nocach);

        this.load.spritesheet('proton', 'assets/characters/protonsprite.png?'+nocach, 32, 32, 15);
        this.load.image('bullet', 'assets/bullet.png?'+nocach);
        this.load.image('void', 'assets/void.png?'+nocach);
        
        this.load.image('UIBullet', 'assets/UI/UIBullet.png?'+nocach);
        this.load.image('UICD', 'assets/UI/UICD.png?'+nocach);
        this.load.image('UIPierce', 'assets/UI/UIPierce.png?'+nocach);
        this.load.image('UICursor', 'assets/UI/UICursor.png?'+nocach);
        
        this.load.image('life Icon', 'assets/UI/Life Icon.png?'+nocach);
        
        this.load.spritesheet('sparkle', 'assets/sparkle.png?'+nocach, 32, 32, 2);
        this.load.image('spot', 'assets/spot.png?'+nocach);
        
        this.load.spritesheet('bouncer', 'assets/characters/bouncer.png?'+nocach, 32, 32, 2);
        this.load.spritesheet('flyer', 'assets/characters/flyer.png?'+nocach, 32, 32, 2);

		this.load.image('tiles', '_map/tileset.png?'+nocach);
        this.load.image('tiles2', '_map/tileset2.png?'+nocach);
        this.load.image('tiles3', '_map/tileset3.png?'+nocach);
		this.load.tilemap('tm-level1', '_map/proton-lvl-1.json?'+nocach, null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('tm-level2', '_map/proton-lvl-2.json?'+nocach, null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('tm-level3', '_map/proton-lvl-3.json?'+nocach, null, Phaser.Tilemap.TILED_JSON);
        
        this.load.audio('lvl1music', 'assets/audio/Revving Eight Bit Engines.mp3?'+nocach);
        this.load.audio('lvl2music', 'assets/audio/Mighty Eight Bit Ranger.mp3?'+nocach);
        this.load.audio('lvl3music', 'assets/audio/Early Summer.mp3?'+nocach);
        this.load.audio('posemusic', 'assets/audio/Turrican 3 Remix.mp3?'+nocach);
        this.load.audio('menumusic', 'assets/audio/Arm Cannon Malfunction.mp3?'+nocach);
        
        this.load.audio('missileDie', 'assets/audio/sound/MissileDie.ogg?'+nocach);
        this.load.audio('pew', 'assets/audio/sound/Pew.ogg?'+nocach);
        this.load.audio('damaged', 'assets/audio/sound/Damaged.ogg?'+nocach);
        this.load.audio('death', 'assets/audio/sound/Death.ogg?'+nocach);
	},
	
	loadUpdate:function()
	{
		console.log(this.load.progress);
		this.preloadBar.scale.y = this.load.progress/100;
	},
	
	create:function()
	{
		console.log("create Preloader function");
		this.state.start("MainMenu");
	}
}