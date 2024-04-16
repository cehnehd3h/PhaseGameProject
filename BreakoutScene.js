import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameScene from './GameScene.js';
import GameObject from './GameObject.js'

import Player from './Player.js'
import Ball from './Ball.js'
import Brick from './Brick.js'

export default class BreakoutScene extends GameScene
{ 
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
    // load all assets ////////////////////////////////////////////////////////////////////////////
    preload() 
    {
        super.preload();

        // !!WARNING!! Textures have to be loaded here! Do not create game objects here!
        this.load.image('paddle.png', './assets/paddle.png');
        this.load.image('ball.png', './assets/ball.png');
        this.load.image('brick.png', './assets/brick.png');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // create the scene ///////////////////////////////////////////////////////////////////////////
    create() 
    {
       super.create();

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
        for(let positionX = 64; positionX < 700; positionX += brickSize)
        {
            this.createBrick(0xff0000, ball, positionX, 50);
        }

        for(let positionX = 64; positionX < 700; positionX += brickSize)
        {
            this.createBrick(0x00ff00, ball, positionX, 200);
        }

        for(let positionX = 64; positionX < 700; positionX += brickSize)
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
       super.update();

        // Implement scene logic here!

        // if there are no more bricks, show the win text
        let numberOfBricksOnTheScreen = global.get('brickCount');
        if(numberOfBricksOnTheScreen == 0)
        {
            this.winText.setVisible(true);
        }
    }
}