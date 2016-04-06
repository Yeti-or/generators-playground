'use strict';
var fs = require('fs');

function run(genFn) {
    var genObj = genFn(go);
    
    function go(err, result) {
        if (err) {
            genObj.throw(err);
        } else {
            genObj.next(result);
        }
    }

    go();
}

run(function* (done) {
    try {
        var dirs = yield fs.readdir(__dirname, done);
    } catch(err) {
        dirs = [null];
    }
    console.log(dirs);
});
