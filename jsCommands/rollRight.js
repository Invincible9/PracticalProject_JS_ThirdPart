function rollRight(array) {
	let result = [];
	result.push(array[array.length - 1]);
	for (var i = 0; i < array.length - 1; i++) {
		result.push(array[i]);
	}
	array = result;
	console.log(array);
	return array;
}