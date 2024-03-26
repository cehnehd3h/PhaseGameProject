import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'

export default class GameObject extends Phaser.GameObjects.Sprite 
{
	constructor(scene, x, y, name, texture)
	{
		super(scene, x, y, texture);

		// add to phaser scene
		scene.add.existing(this);

		// add to physics engine
		scene.physics.add.existing(this);

		// add object to our own tracking system
		gameObjectList.addObject(this);

		this.name = name;
	}

	setVelocityX(x)
	{
		this.body.setVelocityX(x);
	}
	setVelocityY(y)
	{
		this.body.setVelocityY(y);
	}
	setVelocity(v)
	{
		this.body.setVelocity(v);
	}

	// the internal Phaser update. We'll call our update here, to avoid any race conditions
	preUpdate(time, delta)
	{
		this.update();
	}

	// default update
	update() {}

	// default collision
	onCollision(self, hitObject) { }

	// called when the object is destroyed
	onDestroy() { }
}