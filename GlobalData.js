
let globalData = [];

export function get(key)
{
    return globalData[key];
}

export function set(key, value)
{
	globalData[key] = value;
}

export function add(key, value)
{
	globalData[key] += value;
}

export function subtract(key, value)
{
	globalData[key] -= value;
}

export function multiply(key, value)
{
	globalData[key] *= value;
}

export function divide(key, value)
{
	globalData[key] /= value;
}

