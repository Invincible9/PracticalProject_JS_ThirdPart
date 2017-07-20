function rollLeft(array) {
	let result = [];
	for (var i = 1; i < array.length; i++) {
		result.push(array[i]);
	}
	result.push(array[0]);
	array = result;
	return array;
}