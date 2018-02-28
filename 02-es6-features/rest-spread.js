var a, b, rest;
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

// [a, b, , , ...rest] = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(a); // 1
// console.log(b); // 2
// console.log(rest); // [3, 4, 5]

// ({a, c} = {a:1, b:2, c:3});
// console.log(a); // 1
// console.log(c); // 2

// // ES7 - not implemented in Firefox 47a01
// ({a, b, ...rest} = {a:1, b:2, c:3, d:4});
// console.log(a); // 1
// console.log(b); // 2
// console.log(rest); // {c: 3, d: 4}

const obj = {a:1, b:2, c:3, d:4};

const clone = {...obj};
console.log(clone);
console.log(clone === obj);

const clone2 = Object.assign({}, obj);
console.log(clone2);
console.log(clone2 === obj);

var a = [[1], [2], [3]];
var b = [ ...a, [4]];
var [, c] = a;
c.shift();

// b.shift().shift();

console.log('a=', a);
console.log('b=', b);

