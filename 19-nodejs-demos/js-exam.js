'use strict';

for (let i = 0; i < 5; i++) { 
		setTimeout(function(){console.log(i); }, 1000 * i);}

let [, a, , b, ...c] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let obj = { a: "foo", b: 12, c: "bar" };	
let {a} = obj; 