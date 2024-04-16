import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class Bullet extends GameObject
{
	// gets called once when this object gets created
	constructor(scene, x, y, velocityAngle, speed)
	{
		// initialize asteroid
		super(scene, x, y, 'bullet', 'bullet.png');

		this.body.velocity.x = speed * Math.cos(velocityAngle);
		this.body.velocity.y = speed * Math.sin(velocityAngle);

		// set to circle collider
		this.body.isCircle = true;

		// register collision w/ all other asteroids
		this.scene.registerCollision(this, gameObjectList.getObjectsByName('asteroid'));

		this.setScale(0.5);
	}

	update()
	{
		if(this.x < 0 || this.x > 800 || this.y < 0 || this.y > 600)
		{
			gameObjectList.removeObject(this);
		}
	}

	onCollision(self, hitObject)
	{
		console.log('here');
		gameObjectList.removeObject(hitObject);
		gameObjectList.removeObject(self);
	}
}