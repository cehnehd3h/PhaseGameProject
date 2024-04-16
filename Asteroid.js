import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class Asteroid extends GameObject
{
	// gets called once when this object gets created
	constructor(scene, x, y, scale = -1, velocityAngle = -1, speed = -1)
	{
		// choose a random asteroid texture to use
		let index = Phaser.Math.Between(0, 3);
		let tex = 'asteroid' + index + '.png';

		// initialize asteroid
		super(scene, x, y, 'asteroid', tex);

		// randomize orientation
		var rotationAngle = util.degreesToRadians(Phaser.Math.FloatBetween(0, 360));
		this.rotation = rotationAngle;

		// randomize direction
		if(velocityAngle == -1) 
			velocityAngle = util.degreesToRadians(Phaser.Math.FloatBetween(0, 360));

		// randomize speed
		if(speed == -1) 
			speed = Phaser.Math.FloatBetween(10, 50);
		this.body.velocity.x = speed * Math.cos(velocityAngle);
		this.body.velocity.y = speed * Math.sin(velocityAngle);

		// randomize size
		if(scale == -1)
			scale = Phaser.Math.FloatBetween(1, 2);
		this.setScale(scale);
		this.scale = scale;

		// random minor angular rotation?
		this.rotationSpeed = util.degreesToRadians(Phaser.Math.FloatBetween(-100, 100));

		// set to circle collider
		this.body.isCircle = true;

		// register collision w/ the ship
		this.scene.registerCollision(this.scene.ship, this);
	}

	update()
	{
		// wrap around the edges
			// @Mayan use floats?
		this.x = (this.x + 800) % 800;
		this.y = (this.y + 600) % 600;

		// rotate over time
		this.rotation += this.rotationSpeed * this.scene.frameDelta;
	}

	onDestroy()
	{
		if(this.scale >= 1.5)
		{
			// if big enough, spawn baby asteroids, assign random sizes proportional to the original asteroid
			var numChildren = Phaser.Math.Between(2, 4);

			var childScale = this.scale / 2;
			var childSpeed = 100;
			var startingAngle = Phaser.Math.FloatBetween(0, 360);
			var perChildAngleOffset = 360 / numChildren;

			for(var x = 0; x < numChildren; ++x)
			{
				var randomVelJitter = Phaser.Math.FloatBetween(-10, 10);
				let child = new Asteroid(this.scene, this.x, this.y, childScale, util.degreesToRadians(startingAngle + randomVelJitter), childSpeed);
				startingAngle += perChildAngleOffset;
			}
		}
	}

	onCollision(self, hitObject)
	{
	}
}