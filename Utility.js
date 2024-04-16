
export function colorToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

export function degreesToRadians(degrees){
	return degrees * 3.141592 / 180.0;
}
