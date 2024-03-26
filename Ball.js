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

		this.body.setVelocityY(100);

		this.body.setCollideWorldBounds(true);

		this.body.setBounce(1);
	}

	onDestroy()
	{
		console.log("ball dead");
	}

	update()
	{
		let offset = 50;

		if(!global.get('inPlay'))
		{
			let paddle = gameObjectList.getObjectByName('player');
			this.x = paddle.x;
			this.y = paddle.y - offset;
			this.setVelocity(0);

			if (this.scene.cursors.space.isDown)
			{
				global.set('inPlay', true);
				this.setVelocityY(-500);
			}
		}

		if(this.y > 600)
		{
			global.set('inPlay', false);
		}
	}

	onCollision(ball, hitObject)
	{
		if(hitObject.name == 'brick')
		{
			gameObjectList.removeObject(hitObject);
		}
	}
}