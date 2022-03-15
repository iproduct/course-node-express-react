// var a, b, rest;
// [b, a] = [1, 2];
// console.log(a); 
// console.log(b); 

// const [a, b, , , ...rest] = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(a); // 1
// console.log(b); // 2
// console.log(...rest); // [5, 6, 7, 8]

// const obj1 = {a:1, b:2, c:3};
// const {c, a } = obj1;
// console.log(c); // 3
// console.log(a); // 1
// console.log(obj1);

// ES7 - not implemented in Firefox 47a01
// ({a, b, ...rest} = {a:1, b:2, c:3, d:4});
// console.log(a); // 1
// console.log(b); // 2
// console.log(rest); // {c: 3, d: 4}

const obj = {a:1, b:2, c:3, d:4};

// const clone = {...obj, c:18 };
// console.log(obj);
// console.log(clone);
// console.log(clone === obj);

// const clone2 = Object.assign({}, obj, {c: 18});
// console.log(obj);
// console.log(clone2);
// console.log(clone2 === obj);

var a = [[1], [2], [3]];
var b = [ ...a, [4]];
var [, c] = b;
console.log(c.shift());

// console.log(b.shift().shift());

console.log('a=', a);
console.log('b=', b);

