"use strict";
// call signatures
// interface DescribableFunction {
//     description: string;
//     (someArg: number): boolean;
// }
function doSomething(fn) {
    console.log(fn.description + `, tags: ${fn.tags.join(', ')}` + " returned " + fn(60));
}
const f = function (n) {
    return n > 42;
};
f.description = 'demo function';
f.tags = ['intro', 'ts', 'functions'];
doSomething(f);
function fn(ctor) {
    return new ctor("2022-11-17");
}
const obj = fn(Date);
console.log(obj);
const obj2 = fn(String);
console.log(obj2);
console.log([] instanceof Array);
// generic upper bound
function longest(a, b) {
    return getLength(a) >= getLength(b) ? a : b;
}
function getLength(a) {
    return typeof a === 'string' || (typeof a === 'object' && 'length' in a) ?
        a.length :
        (a + '').length;
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", new Date());
console.log(longerString);
// Error! Numbers don't have a 'length' property
const notOK = longest(10, "100");
console.log(notOK);
// callback parameters
function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i, '-->');
    }
}
myForEach([1, 2, 3], (a) => {
    console.log(a);
});
class DB {
    filterUsers(filter) {
        return [];
    }
}
const getDB = () => new DB();
const db = getDB();
const admins = db.filterUsers(function () {
    return this.admin;
});
// rest and spread arguments
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
console.log(arr1);
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
args[0]++;
// args.push(42); // can not do this, if as const
const angle = Math.atan2(...args);
function sum(dictNumbers) {
    console.log(Object.keys(dictNumbers)
        .map(key => dictNumbers[key]).reduce((a, b) => a + b));
}
sum({ a: 10, b: 3, c: 9, d: 27, f: 72 });
//# sourceMappingURL=functions.js.map