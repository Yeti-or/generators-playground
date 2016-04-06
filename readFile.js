'use strict';

const fs = require('fs');

let filename = process.argv[2];
readFile(filename, chain(splitLines, numberLines));

function chain() {
    let generatorObject = arguments[arguments.length - 1]();
    generatorObject.next();

    for (let i = arguments.length - 2; i >= 0; i--) {
        let generatorFunction = arguments[i];
        generatorObject = generatorFunction(generatorObject);
        generatorObject.next();
    }
    return generatorObject;
}

function readFile(fileName, target) {
    fs.createReadStream(fileName, {encoding: 'utf8', bufferSize: 1024})
        .on('data', function (buffer) {
            let str = buffer.toString('utf8');
			debugger;
            target.next(str);
        })
        //.on('end', () => {
		//	debugger;
        //    //target.return();
		//});
}

function* splitLines(target) {
    let prev = '';
    while (true) {
        prev += yield;
        let eolI;
        while ((eolI = prev.indexOf('\n')) >= 0) {
            let line = prev.slice(0, eolI);
            target.next(line);
            prev = prev.slice(eolI + 1);
        }
    }
}

function* numberLines(target) {
    for (let lineN = 1; ; lineN++) {
        let line = yield;
        //yield* printLines(lineN);
        target.next(`${lineN}: ${line}`);
    }
}

function* printLines(lineN) {
    while (true) {
        var line = yield;
        console.log(`${lineN}: ${line}`);
    }
}
