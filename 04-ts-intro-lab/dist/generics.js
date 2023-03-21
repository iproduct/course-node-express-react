/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
// @strict: false
export class GenericNumber {
    constructor() {
        this.add = function (x, y) {
            if (typeof x === 'number') {
                return x + y;
            }
            else if (x instanceof Date) {
                return new Date(x.getFullYear(), x.getMonth(), x.getDay() + y.getDay() % 30);
            }
            else {
                const _neverHere = x;
                return _neverHere;
            }
        };
    }
}
const myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
// keyof
// @errors: 2345
function getProperty(obj, key) {
    return obj[key];
}
const globalSymbolA = Symbol.for('a');
const x = { [globalSymbolA]: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(x, 'b'));
console.log(getProperty(x, "c"));
// generic constructors
// @strict: false
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nametag = "Mikle";
    }
}
class Animal {
    constructor() {
        this.numLegs = 4;
    }
}
class Bee extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new BeeKeeper();
    }
}
class Lion extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
//   ^?
const arr = ['abc', 'def'];
const keyOfA = 1;
console.log(arr[keyOfA]);
const obj = { [1]: 'abc', address: 'def' };
const keyOfM = 1;
console.log(obj[keyOfM]);
function f() {
    return { x: 10, y: 3 };
}
// ---cut---
function createLabel(idOrName) {
    throw "unimplemented";
}
const a = createLabel("typescript");
const b = createLabel(2.8);
const c = createLabel(Math.random() ? "hello" : 42);
const conforms = {
    del: 'Del',
    rodney: new Date()
};
const listeners = {
    isLiteningDel: (name) => true,
    isLiteningRodney: (name) => true,
    //   speedy: true
};
//# sourceMappingURL=generics.js.map