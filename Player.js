import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class Player extends GameObject
{
	// gets called once when this object gets created
	constructor(scene, x, y)
	{
		// set the name and texture for the player, so it's easy to be consistent
		super(scene, x, y, 'player', 'paddle.png');

		this.body.setImmovable()

		console.log("A new player has been made!");
	}

	// this function gets called every frame
	update()
	{
		let playerSpeed = 200;

		// if a button is pressed, move the player left
		if (this.scene.cursors.left.isDown)
		{
			this.setVelocityX(-playerSpeed);
		}

		// if we press the right key
		else if (this.scene.cursors.right.isDown)
		{
			this.setVelocityX(playerSpeed);
		}
		else // if nothing is being pressed
		{
			this.setVelocityX(0);
		}
	}
}