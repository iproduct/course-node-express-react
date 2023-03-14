const object1 = {};
const a = Symbol('a');
const a2 = Symbol('a');
const b = Symbol.for('b');
const b2 = Symbol.for('b');
console.log(a === a2);
console.log(b === b2);

object1[a] = 'localSymbol';
object1[b] = 'globalSymbol';
object1.abcd = 'notASymbol';

const objectSymbols = Object.getOwnPropertySymbols(object1);

console.log(objectSymbols.length);
console.log(objectSymbols);
// expected output: 2
