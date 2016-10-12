var game = new Phaser.Game(1080, 720, Phaser.CANVAS, 'game01v', { preload: preload,
 create: create,update: update });

var cursors;

function preload() {
	game.load.audio('engine',['assets/randomize3.mp3','assets/randomize3.oog']);
	game.load.audio('music',['assets/wicked.mp3','assets/wicked.oog'])
	game.load.image('space','assets/starfield.png');
	game.load.image('warship','assets/warship.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.image(0,0, 'space')
	//music
	music=game.add.audio("music")
	music.play('',1,true);
	players = game.add.group();
	players.enableBody = true;

	createPlayer(300,400);

	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	playerUpdate();
}

function createPlayer(x,y){
	var player = players.create(x,y, 'warship');
	player.body.bounce.y =.25;
	player.body.gravity.y = 0;
	player.body.collideWorldBounds = true;
}

function playerUpdate(){
	game.physics.arcade.collide(players, players)
	players.forEach(function(p){
		p.body.velocity.x = 0;
		if(cursors.left.isDown){
			var snd = game.add.audio("engine")
			snd.play();
			p.body.velocity.x = -150;
		}else if(cursors.right.isDown){
			var snd = game.add.audio("engine")
			snd.play();
			p.body.velocity.x = 150;
		}
		p.body.velocity.y = 0;
		if(cursors.up.isDown){
			var snd = game.add.audio("engine")
			snd.play();
			p.body.velocity.y = -150
		}
		else if(cursors.down.isDown){
			p.body.velocity.y = 150;
			var snd = game.add.audio("engine")
			snd.play();
		}
		});
}