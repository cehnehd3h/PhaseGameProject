import GameScene from './Game.js';

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
        scene: [GameScene]
    };

    var game = new Phaser.Game(config);
};
