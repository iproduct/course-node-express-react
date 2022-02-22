function f({a, b = 0} = {a: "!"}) { return [a, b] } 

console.log([f({a: "ok"}), f(), f({})]);

let [, a, , b, ...c] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const r = `${a},${b},${c}`;
console.log(r)
