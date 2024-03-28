import * as util from './Utility.js'
import * as global from './GlobalData.js'
import * as gameObjectList from './GameObjectList.js'
import GameObject from './GameObject.js'

export default class Brick extends GameObject
{
	constructor(scene, x, y)
	{
		// set the name and texture for the player, so it's easy to be consistent
		super(scene, x, y, 'brick', 'brick.png');

		this.body.setImmovable();
	}

	onDestroy()
	{

	}
}