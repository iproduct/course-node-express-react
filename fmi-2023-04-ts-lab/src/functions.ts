// call signatures
// interface DescribableFunction {
//     description: string;
//     (someArg: number): boolean;
// }

// interface DescribableFunction {
//     tags: string[]
// }

type BaseFunction = {
  description: string;
  (someArg: number): boolean;
}

type DescribableFunction = BaseFunction & {
  tags: string[]
}

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + `, tags: ${fn.tags.join(', ')}` + " returned " + fn(60));
}

const f: DescribableFunction = function (n: number) {
  return n > 42;
}

f.description = 'demo function'
f.tags = ['intro', 'ts', 'functions']

doSomething(f)

// constructor signature
type SomeObject = any;
// ---cut---
type SomeConstructor = {
  new(s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("2022-11-17");
}

const obj = fn(Date);
console.log(obj);

const obj2 = fn(String);
console.log(obj2);

console.log([] instanceof Array);

// generic upper bound
function longest<
  T1 extends { length: number } | { toString(): string },
  T2 extends { length: number } | { toString(): string }
>(a: T1, b: T2) {
  return getLength(a) >= getLength(b) ? a : b;
}

function getLength<T extends { length: number } | { toString(): string }>(a: T) {
  return typeof a === 'string' || (typeof a === 'object' && 'length' in a) ?
    a.length :
    (a + '').length
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
function myForEach(arr: any[], callback: (arg: any, index: number, message: string) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, '-->');
  }
}

myForEach([1, 2, 3], (a) => {
  console.log(a);
});

// this parameter
interface User {
  id: number;
  admin: boolean;
}
class DB {
  filterUsers(filter: (this: User) => boolean): User[] {
    return [];
  }
}

const getDB = () => new DB()


const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});


// rest and spread arguments
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
console.log(arr1);

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args: [number, number] = [8, 5];
args[0]++;
// args.push(42); // can not do this, if as const
const angle = Math.atan2(...args);


// params rest spread
type MyDictNumbers = {
  [key: string]: number;
};
function sum(dictNumbers: MyDictNumbers) {
  console.log(Object.keys(dictNumbers)
    .map(key => dictNumbers[key]).reduce((a, b) => a + b)
  );
}

sum({ a: 10, b: 3, c: 9, d: 27, f: 72 });