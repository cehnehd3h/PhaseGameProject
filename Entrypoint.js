
import AsteroidScene from './AsteroidScene.js';
import BreakoutScene from './BreakoutScene.js';

// boilerplate logic for phaser to initialize the game engine
window.onload = () => {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        fps: { forceSetTimeOut: true, target: 30 },
        scene: [AsteroidScene]
    };

    var game = new Phaser.Game(config);
};
