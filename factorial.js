'use strict';

function* fact(n) {
    let prev = 1;
    if (n > 1) {
        prev = yield* fact(n - 1);
    }
    yield n * prev;
    return n * prev;
}

//function* fact(n) {
//    yield n;
//    if (n > 1) {
//        yield* fact(n - 1);
//    }
//}

//function* fact(n) {
//    let prev = n;
//    if (n > 1) {
//        for (let i of fact(n - 1)) {
//            prev = i;
//            yield i;
//        }
//    }
//    yield n * prev;
//}

function* factorial(n) {
    for (let i = 1, prev = i; i <= n; i++) {
        prev *= i;
        yield prev;
    }
}

for (let n of factorial(5)) {
  console.log(n)
}

for (let n of fact(5)) {
  console.log(n)
}

// 1, 2, 6, 24, 120
