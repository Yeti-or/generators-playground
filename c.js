function coroutine(generatorFunction) {
	return function (...args) {
		let generatorObject = generatorFunction(...args);
		generatorObject.next();
		return generatorObject;
	};
}
