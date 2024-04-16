import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class GameScene extends Phaser.Scene 
{
    // register a collision between 2 objects. Optionally provide a callback
    registerCollision(obj1, obj2, callback = null)
    {
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
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // create the scene ///////////////////////////////////////////////////////////////////////////
    create() 
    {
        // track framerate
        this.fpsText = this.add.text(700, 10, '', { font: '16px Arial', fill: util.colorToHex(0, 255, 0) });

         // shortcut for input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.frameDelta = 0.0;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main scene update //////////////////////////////////////////////////////////////////////////
    update() 
    {
        // track frame time
        this.frameDelta = this.game.loop.delta / 1000.0;
        this.fpsText.setText('FPS: ' + this.game.loop.actualFps.toFixed(2));
    }
}


