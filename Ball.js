import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class Ball extends GameObject
{
	constructor(scene, x, y)
	{
		// set the name and texture for the player, so it's easy to be consistent
		super(scene, x, y, 'ball', 'ball.png');

		// set the initial velocity
		this.setVelocityX(-250);
		this.setVelocityY(-202);

		// tell the game to let the ball bounce
		this.body.setBounce(1);

		// tell the game to let the ball bounce off the walls
		this.body.setCollideWorldBounds(true);
	}

	update()
	{
		// if the y coordinate is greater than 600, the ball is offscreen
		// move it back onto the screen
		if(this.y > 600)
		{
			this.x = 400;
			this.y = 300;
		}
	}

	// this function gets called when the ball hits something
	onCollision(ball, hitObject)
	{
		console.log("The ball hit something");

		gameObjectList.removeObject(hitObject);

		global.subtract('brickCount', 1);
		console.log(global.get('brickCount'));
	}
}