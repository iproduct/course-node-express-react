// let a, b, rest;
// [a, b] = [1, 2];
// console.log('before swap', a, b); 
// [a, b] = [b, a];
// console.log('after swap', a, b, c); 

// const [a, b, , , ...rest] = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(a); // 1
// console.log(b); // 2
// console.log(rest); 
// console.log(...rest); 

// const obj1 = {a:1, b:2, c:3};
// const {c, a} = obj1;
// console.log(c); // 3
// console.log(a); // 1
// console.log(obj1);

// ES7 
// ({c, a, ...rest} = {a:1, b:2, c:3, d:4});
// console.log(a); 
// console.log(c); 
// console.log(...(Object.entries(rest)));

// const obj = {a:1, b:2, c:3, d:4};
// const clone = {...obj, c:18, f:42 };
// console.log(obj);
// console.log(clone);
// console.log(clone === obj);

// const clone2 = Object.assign({}, obj, {c: 18}, {f:42});
// console.log(obj);
// console.log(clone2);
// console.log(clone2 === obj);

var a = [[1], [2], [3]];
var b = [ ...a, [4]]; // shallow copy
// var b = a.concat([[4]]); // shallow copy

// var b = [ ...JSON.parse(JSON.stringify(a)), [4]]; // deep copy
// var b = [ ...(window.structuredClone(a)), [4]]; // deep copy
console.log('b=', b);
const [, c] = b;
console.log(c);
console.log(c.shift());
console.log(c);

// // console.log(b.shift().shift());

console.log('a=', a);
console.log('b=', b);

