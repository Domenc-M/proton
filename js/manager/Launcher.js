States.Launcher = function ()
{
	this.preloadBar = null;
}

States.Launcher.prototype = {
	
	init:function()
	{
		//game -> this
		//nous sommes dans un etat du jeu
		//la reference au game passe donc maintenant par la
		//clef this et non plus par une variable
		
		var loader = this.add.group();
		
		this.preloadBar = this.add.graphics(0, 0);
		this.preloadBar.beginFill(0x00CCFF);
		this.preloadBar.drawRect(0, 0, 256, 256);
		loader.add(this.preloadBar);
        
		loader.x = this.stage.width/2 - loader.width/2;
		loader.y = this.stage.height/2 - loader.height/2;
	},
	
	preload:function()
	{
		var nocach = Math.random();
        
        this.load.image('loadUp', 'assets/loadscreen-upper.png?'+nocach);
        this.load.image('loadDown', 'assets/loadscreen-lower.png?'+nocach);
	},
	
	loadUpdate:function()
	{
		console.log(this.load.progress);
		this.preloadBar.scale.y = this.load.progress/100;
	},
	
	create:function()
	{
		console.log("create Preloader function");
		this.state.start("Preloader");
	}
}