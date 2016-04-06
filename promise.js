'use strict';
var fs = require('fs');

function run(genFn) {
    var genObj = genFn();

    (function go(result) {
        if (result.done) return;

        var promise = result.value;
    
        promise && promise.then((res) => {
            genObj.next(res);
        })
        .catch((err) => {
            genObj.throw(err);
        });

    })(genObj.next());
}

function readDir(name) {
    return new Promise((resolve, reject) => {
        fs.readdir(name, function(err, res) {
            err && reject(err);
            res && resolve(res);
        });
    });
}

run(function* () {
    try {
        var dirs = yield readDir(__dirname);
    } catch(err) {
        dirs = [null];
    }
    console.log(dirs);
});
