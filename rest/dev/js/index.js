import 'styles/index';
import 'assets/star';
import 'assets/sky';
import 'assets/platform';
import 'assets/dude';

import 'phaser';


var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'app', { preload: preload, create: create, update: update });
var bullets
var ship;


function preload() {
    game.load.image('dude', 'assets/star.png');
    game.load.image('star', 'assets/star.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    bullets = game.add.group();
    for (var i = 0; i < 10; i++) {
        var bullet = bullets.create(game.rnd.integerInRange(200, 1700), game.rnd.integerInRange(-200, 400), 'star');
        game.physics.p2.enable(bullet,false);
    }

    ship = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.p2.enable(ship);
};

function update() {
    var cursors = game.input.keyboard.createCursorKeys();

    bullets.forEachAlive(moveBullets,this);  //make bullets accelerate to ship

    if (cursors.left.isDown) {ship.body.rotateLeft(100);}   //ship movement
    else if (cursors.right.isDown){ship.body.rotateRight(100);}
    else {ship.body.setZeroRotation();}
    if (cursors.up.isDown){ship.body.thrust(400);}
    else if (cursors.down.isDown){ship.body.reverse(400);}
};


function moveBullets (bullet) {
     accelerateToObject(bullet,ship,30);  //start accelerateToObject on every bullet
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
    obj1.body.force.y = Math.sin(angle) * speed;
}
























// var platforms;
// var player;
// var stars;
// var score = 0;
// var scoreText;
//
//
//
// function preload() {
//     game.load.image('sky', 'assets/sky.png');
//     game.load.image('ground', 'assets/platform.png');
//     game.load.image('star', 'assets/star.png');
//     game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
// }
//
// function create() {
//     //  We're going to be using physics, so enable the Arcade Physics system
//     game.physics.startSystem(Phaser.Physics.ARCADE);
//
//     //  A simple background for our game
//     var sky = game.add.sprite(0, 0, 'sky');
//     sky.scale.setTo(3,3)
//
//     //  The platforms group contains the ground and the 2 ledges we can jump on
//     platforms = game.add.group();
//
//     //  We will enable physics for any object that is created in this group
//     platforms.enableBody = true;
//
//     // Here we create the ground.
//     var ground = platforms.create(0, game.world.height - 32, 'ground');
//
//     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
//     ground.scale.setTo(5, 2);
//
//     //  This stops it from falling away when you jump on it
//     ground.body.immovable = true;
//
//     //  Now let's create two ledges
//     var ledge = platforms.create(400, 400, 'ground');
//     ledge.scale.setTo(5,3)
//
//     ledge.body.immovable = true;
//
//     ledge = platforms.create(-150, 250, 'ground');
//
//     ledge.body.immovable = true;
//
//
//
//
//     // The player and its settings
//     player = game.add.sprite(32, game.world.height - 150, 'dude');
//
//     //  We need to enable physics on the player
//     game.physics.arcade.enable(player);
//
//     //  Player physics properties. Give the little guy a slight bounce.
//     player.body.bounce.y = 0.2;
//     player.body.gravity.y = 100;
//     player.body.collideWorldBounds = true;
//
//     //  Our two animations, walking left and right.
//     player.animations.add('left', [0, 1, 2, 3], 10, true);
//     player.animations.add('right', [5, 6, 7, 8], 10, true);
//
//
//
//
//
//     stars = game.add.group();
//
//     stars.enableBody = true;
//
//     //  Here we'll create 12 of them evenly spaced apart
//     for (var i = 0; i < 12; i++)
//     {
//         //  Create a star inside of the 'stars' group
//         var star = stars.create(i * 70, 0, 'star');
//
//         //  Let gravity do its thing
//         star.body.gravity.y = 10;
//
//         //  This just gives each star a slightly random bounce value
//         star.body.bounce.y = 0.7 + Math.random() * 0.2;
//     }
//
//     scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
//
//
// }
//
// function update() {
//     //  Collide the player and the stars with the platforms
//     game.physics.arcade.collide(player, platforms);
//     game.physics.arcade.collide(stars, platforms);
//     game.physics.arcade.overlap(player, stars, collectStar, null, this);
//
//
//     var cursors = game.input.keyboard.createCursorKeys();
//     //  Reset the players velocity (movement)
//    player.body.velocity.x = 0;
//
//    if (cursors.left.isDown)
//    {
//        //  Move to the left
//        player.body.velocity.x = -150;
//
//        player.animations.play('left');
//    }
//    else if (cursors.right.isDown)
//    {
//        //  Move to the right
//        player.body.velocity.x = 150;
//
//        player.animations.play('right');
//    }
//    else
//    {
//        //  Stand still
//        player.animations.stop();
//
//        player.frame = 4;
//    }
//
//    //  Allow the player to jump if they are touching the ground.
//    if (cursors.up.isDown && player.body.touching.down)
//    {
//        player.body.velocity.y = -350;
//    }
// }
//
// function collectStar (player, star) {
//
//     // Removes the star from the screen
//     star.kill();
//     //  Add and update the score
//     score += 10;
//     scoreText.text = 'Score: ' + score;
//
// }
