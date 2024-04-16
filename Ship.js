import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

import Bullet from './Bullet.js'

export default class Ship extends GameObject
{
	// gets called once when this object gets created
	constructor(scene, x, y)
	{
		// set the name and texture for the ship, so it's consistent
		super(scene, x, y, 'Ship', 'ship.png');

		this.dragAmount = 0.5;
		this.speed = 10;
		this.rotationSpeed = util.degreesToRadians(180);
		this.useDrag = true;
		this.bulletSpeed = 400;
		this.fireCooldown = 0.15;


		this.shipAngle = 0;
		this.currentCooldown = 0;

		// enable drag so the ship will slow down
			// the smaller the number, the quicker it'll stop
		if(this.useDrag)
		{
			this.body.setDrag(0.5, 0.5);
			this.body.useDamping = true
			this.body.allowDrag = true;
		}

		this.setScale(0.75);
	}

	update()
	{
		// wrap around the edges
			// @Mayan use floats?
		this.x = (this.x + 800) % 800;
		this.y = (this.y + 600) % 600;

		// if a button is pressed, move the player forward, relative to the rotation of the object
		if(this.scene.cursors.up.isDown)
		{
			this.body.velocity.x += Math.cos(this.shipAngle) * this.speed;
			this.body.velocity.y += Math.sin(this.shipAngle) * this.speed;
		}

		// rotate left and right
		if(this.scene.cursors.left.isDown)
		{
			this.shipAngle -= this.rotationSpeed * this.scene.frameDelta;
		}
		if(this.scene.cursors.right.isDown)
		{
			this.shipAngle += this.rotationSpeed * this.scene.frameDelta;
		}

		// update the sprite's rotation with our calculated angle
		this.rotation = this.shipAngle;

		// spawn bullets
		if (this.scene.cursors.space.isDown && this.currentCooldown <= 0)
		{
			let bullet = new Bullet(this.scene, this.x, this.y, this.rotation, this.bulletSpeed);
			this.currentCooldown = this.fireCooldown;
		}

		this.currentCooldown -= this.scene.frameDelta;
	}

	onCollision(self, hitObject)
	{
		gameObjectList.removeObject(hitObject);
	}
}