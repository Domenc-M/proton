States.MainMenu = function ()
{
	this.enterKey = null;
    this.cursors = null;
    this.menuAudio = null;
    this.PKey = null;
    this.OKey = null;
    this.select = 0;
    this.arrow = null;
    this.howTo = null;
    this.board = 0;
}

States.MainMenu.prototype = {
	
	resetVars:function()
	{
		Vars.lives = Vars.startLives;
        Vars.score = Vars.startScore;
	},
	
	create:function()
	{
		this.resetVars();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.menuAudio = this.add.audio('menumusic');
        this.sound.setDecodedCallback(this.menuAudio, this.playMusic, this)
        this.sound.volume = 0.1;
		//BG
		var bg = this.game.add.image(0, 0, "bgHome");
		
		var tweenBG = this.game.add.tween(bg);
		tweenBG.from({alpha:0}, 500, Phaser.Easing.Quartic.Out, true);
		
		//LOGO
		var logo = this.game.add.image(this.game.camera.view.width/2, 60, "logo");
		logo.anchor.setTo(0.5, 0);
		
		var tweenLogo = this.game.add.tween(logo);
		tweenLogo.from({alpha:0}, 1500, Phaser.Easing.Quartic.Out, true, 500);
		
		//TEXT START
		var UIStart = this.game.add.text(this.game.camera.view.width/2, 295, "PLAY", FontStyle.fs1);
		UIStart.anchor.setTo(0.5, 0);
        
        var tweenUIStart = this.game.add.tween(UIStart);
		tweenUIStart.from({alpha:0, x:UIStart.x-20}, 800, Phaser.Easing.Quartic.Out, true, 1300);
        
        //TEXT HOW TO PLAY
        var UITuto = this.game.add.text(this.game.camera.view.width/2 - 30, 340, "How to play", FontStyle.fs1);
		UIStart.anchor.setTo(0.5, 0);
		
		var tweenUITuto = this.game.add.tween(UITuto);
		tweenUITuto.from({alpha:0, x:UITuto.x-20}, 800, Phaser.Easing.Quartic.Out, true, 1300);
        
        //SELECTION ARROW
        this.arrow = this.game.add.image(this.game.camera.view.width/2 - 90, 285, "UICursor");
        
        var tweenArrow = this.game.add.tween(this.arrow);
		tweenArrow.from({alpha:0, x:this.arrow.x-20}, 800, Phaser.Easing.Quartic.Out, true, 1300);
        
        //HOW TO PLAY BOARD
        this.howTo = this.game.add.image(-500, -500, "howTo");
        
		
        //KEY ATTRIBUTION
		this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.enterKey.onDown.add(this.PressEnter, this);
        this.PKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.PKey.onDown.add(this.startLevel2, this);
        this.OKey = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
        this.OKey.onDown.add(this.startLevel3, this);
        this.cursors.down.onDown.add(this.selectHowto, this);
        this.cursors.up.onDown.add(this.selectPlay, this);
        
	},
	
    playMusic:function()
    {
     this.menuAudio.play();   
    },
    
    selectHowto:function()
    {
    if (this.board == 0)
        {
         this.select = 1;
         this.arrow.y = 330;  
        }
    },
    
    selectPlay:function()
    {
    if (this.board == 0)
        {
         this.select = 0;
         this.arrow.y = 285;   
        }
    },
    
	PressEnter:function()
	{
        if (this.select == 0)
        {
        var transitionScreen = new UILevelInfos(this.game, true, false, "New Hill Valley");
		this.add.existing(transitionScreen);
		
        this.menuAudio.stop();
        
		this.game.time.events.add(Phaser.Timer.SECOND * 3, this.launchLevel, this);   
        }
        
        else  if (this.board == 0)  
        {
        var tweenhowTo = this.game.add.tween(this.howTo);
		tweenhowTo.to({x:0, y:0}, 800, Phaser.Easing.Quartic.Out, true, 0);
        this.board = 1;
        return;
        }
        else if (this.board == 1)
        {
        var tweenhowTo2 = this.game.add.tween(this.howTo);
		tweenhowTo2.to({x:-500, y:-500}, 800, Phaser.Easing.Quartic.Out, true, 0);
        this.board = 0;
        return;
        }

	},
	
	launchLevel:function()
	{
		this.game.state.start("Level1");
	},
    
    startLevel2:function()
	{
        this.menuAudio.stop();
		this.game.state.start("Level2");
	},
    
    startLevel3:function()
	{
        this.menuAudio.stop();
		this.game.state.start("Level3");
	}
    
    
}