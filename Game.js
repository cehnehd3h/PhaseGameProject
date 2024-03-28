import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

import Player from './Player.js'
import Ball from './Ball.js'
import Brick from './Brick.js'

export default class GameScene extends Phaser.Scene 
{
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

    createBrick(color, ball, x, y)
    {
        let brick = new Brick(this, x, y);

        // register collision between ball and the brick
        this.registerCollision(ball, brick);

        // set the color of the brick
        brick.setTint(color);

        global.add('brickCount', 1);
        console.log(global.get('brickCount'));
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // create the scene ///////////////////////////////////////////////////////////////////////////
    create() 
    {
        // track framerate
        this.fpsText = this.add.text(700, 10, '', { font: '16px Arial', fill: util.colorToHex(0, 255, 0) });

         // shortcut for input
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Initialize your scene here!

        // create the paddle
        let player = new Player(this, 400, 600);

        // create the ball
        let ball = new Ball(this, 400, 300);

        // register collision between ball and paddle
        this.registerCollision(player, ball);

        global.set('brickCount', 0);

        let brickSize = 64;
        for(let positionX = 64; positionX < 120; positionX += brickSize)
        {
            this.createBrick(0xff0000, ball, positionX, 50);
        }

        for(let positionX = 64; positionX < 120; positionX += brickSize)
        {
            this.createBrick(0x00ff00, ball, positionX, 200);
        }

        for(let positionX = 64; positionX < 120; positionX += brickSize)
        {
            this.createBrick(0x0000ff, ball, positionX, 100);
        }

        // create text to tell the player they won!
        this.winText = this.add.text(400, 300, 'You Win!', { fontSize: '64px', fill: '#F00' });
        
        // hide the text by default
        this.winText.setVisible(false);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main scene update //////////////////////////////////////////////////////////////////////////
    update() 
    {
        this.fpsText.setText('FPS: ' + this.game.loop.actualFps.toFixed(2));

        // Implement scene logic here!

        // if there are no more bricks, show the win text
        let numberOfBricksOnTheScreen = global.get('brickCount');
        if(numberOfBricksOnTheScreen == 0)
        {
            this.winText.setVisible(true);
        }
    }
}


