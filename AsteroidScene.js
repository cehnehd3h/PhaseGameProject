import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameScene from './GameScene.js';
import GameObject from './GameObject.js'

import Ship from './Ship.js'
import Asteroid from './Asteroid.js'

import Bullet from './Bullet.js'

export default class AsteroidScene extends GameScene
{
    // restart the game, reloading the level
    restart()
    {
        super.restart();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // load all assets ////////////////////////////////////////////////////////////////////////////
    preload() 
    {
        super.preload();
        // !!WARNING!! Textures have to be loaded here! Do not create game objects here!
        this.load.image('ship.png', './assets/ship.png');
        this.load.image('asteroid0.png', './assets/asteroid0.png');
        this.load.image('asteroid1.png', './assets/asteroid1.png');
        this.load.image('asteroid2.png', './assets/asteroid2.png');
        this.load.image('asteroid3.png', './assets/asteroid3.png');

        this.load.image('bullet.png', './assets/bullet.png');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // create the scene ///////////////////////////////////////////////////////////////////////////
    create() 
    {
        super.create();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Initialize your scene here!

        // create new player ship
        this.ship = new Ship(this, 400, 300);
        
        // create asteroids
        for(var x = 0; x < 30; ++x)
        {
            var xPos = Phaser.Math.Between(0, 800);
            var yPos = Phaser.Math.Between(0, 600);
            let asteroid = new Asteroid(this, xPos, yPos);
            this.registerCollision(this.ship, asteroid);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main scene update //////////////////////////////////////////////////////////////////////////
    update() 
    {
        super.update();

        // Implement scene logic here!
    }
}


