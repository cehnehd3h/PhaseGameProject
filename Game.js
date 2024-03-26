import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'
import Player from './Player.js'
import Brick from './Brick.js'
import Ball from './Ball.js'

export default class GameScene extends Phaser.Scene 
{
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // utility functions //////////////////////////////////////////////////////////////////////////

    // register a collision between 2 objects. Optionally provide a callback
    registerCollision(obj1, obj2, callback = null) {
        if (callback) {
            this.physics.add.collider(obj1, obj2, callback, null, this);
        } else {
             this.physics.add.collider(obj1, obj2, obj1.onCollision, null, this);
        }
    }

    // restart the game, reloading the level
    restart()
    {
        gameObjectList.removeAllObjects();
        this.scene.restart();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // load all assets ////////////////////////////////////////////////////////////////////////////
    preload() 
    {
        // !!WARNING!! Textures have to be loaded here! Do not create game objects here!
        this.load.image('paddle.png', './assets/paddle.png');
        this.load.image('ball.png', './assets/ball.png');
        this.load.image('brick.png', './assets/brick.png');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // create the scene ///////////////////////////////////////////////////////////////////////////
    create() 
    {
	// track fps
	this.fpsText = this.add.text(700, 10, '', { font: '16px Arial', fill: '#00ff00' });

         // shortcut for input
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        /////////////////////////////////////////
        // create your initial objects here! ////
        let player = new Player(this, 0, 0);

        // set initial player position
        player.setPosition(400, 500);

        // create the ball
        let ball = new Ball(this, 400, 400);

        // register collision between ball and brick
        this.registerCollision(player, ball);

        // create score text to show our score
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#F00' });
        this.scoreText.setDepth(1);

        // initial play state to false
        global.set('inPlay', false);

        // Create bricks!
        global.set('brickCount', 0);

        let yCount = 3;
        let xCount = 1;
        let spacing = 10;
        let size = 64 + spacing;
        for(let y = 0; y < 64 * yCount; y += size)
        {
            for(let x = 0; x < 64 * xCount; x += size)
            {
                // create a new brick
                let brick = new Brick(this, x + 150, y + 50);

                // register the collision between the player and this brick
                this.registerCollision(ball, brick);

                global.add('brickCount', 1);
            }
        }
        
        // initialize global score
        global.set('score', 0);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main scene update //////////////////////////////////////////////////////////////////////////
    update() 
    {
	this.fpsText.setText('FPS: ' + this.game.loop.actualFps.toFixed(2));
        let bricksLeft = global.get('brickCount');
        
        if(bricksLeft == 0)
        {
            console.log('You win!')
            this.restart();
        }

        this.scoreText.setText(`Score: ${global.get('score')}`);

        // Implement scene logic here!
        
    }
}


