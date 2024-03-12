let objectList = [];

// Add an object to the global object list. Will get automatically called if you inherit from the GameObject class
export function addObject(object)
{
    objectList.push(object);
    return object;
}

// Remove an object from the global object list. This is the same as deleting an object from the world
export function removeObject(object)
{
    const index = objectList.indexOf(object);
    if (index > -1) { 
        objectList.splice(index, 1);
    }
    object.onDestroy(); // call our custom onDestroy first
    object.destroy();	// notify Phaser that this object should be removed
}

// Remove all objects from the game
export function removeAllObjects()
{
    const allObjects = getList();
    allObjects.forEach(object => {
        object.onDestroy();
        object.destroy();
    });
    objectList.length = 0;
}

// Find a specific object by name
export function getObjectByName(name) 
{
    return objectList.find(object => object.name === name);
}

// Get an array of all objects with a matching name
export function getObjectsByName(name)
{
	return objectList.filter(object => object.name === name);
}

// get the list of objects
export function getList()
{
	return objectList;
}
