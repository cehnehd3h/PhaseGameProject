
let globalData = [];

// get a value from global data
export function get(key)
{
    return globalData[key];
}

// set a value from global data
export function set(key, value)
{
	globalData[key] = value;
}

// Add to a value from global data
export function add(key, value)
{
	globalData[key] += value;
}

// Subtract to a value
export function subtract(key, value)
{
	globalData[key] -= value;
}

// Multiply by a value
export function multiply(key, value)
{
	globalData[key] *= value;
}

// Divide by a value
export function divide(key, value)
{
	globalData[key] /= value;
}

