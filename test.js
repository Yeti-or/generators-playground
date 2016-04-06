function *genFn(n) {
	console.log('hello');
	console.log(`${yield n}`);
	console.log('end');
}

var genObj = genFn();

genObj.next(41);
genObj.next(42);
//genObj.next(43);
