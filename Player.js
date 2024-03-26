import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class Player extends GameObject
{
	constructor(scene, x, y)
	{
		// set the name and texture for the player, so it's easy to be consistent
		super(scene, x, y, 'player', 'paddle.png');

		this.body.setImmovable()
	}

	update()
	{
		let speed = 300;
		if (this.scene.cursors.left.isDown)
		{
			 this.setVelocityX(-speed);
		}
		else if (this.scene.cursors.right.isDown)
		{
			 this.setVelocityX(speed);
		}
		else 
		{
			 this.setVelocityX(0);
		}

		if (this.scene.cursors.up.isDown)
		{
			 this.setVelocityY(-speed);
		}
		else if (this.scene.cursors.down.isDown)
		{
			 this.setVelocityY(speed);
		}
		else 
		{
			 this.setVelocityY(0);
		}
	}

	onCollision(paddle, ball)
	{
		let diff = 0;
		
 		if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
	}
}