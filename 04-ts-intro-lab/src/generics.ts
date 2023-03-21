/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
// @strict: false
export class GenericNumber<NumType extends number | Date> {
    zeroValue: NumType | undefined;
    add: (x: NumType, y: NumType) => number | Date = function (x, y) {
        if (typeof x === 'number') {
            return x + (y as number);
        } else if (x instanceof Date) {
            return new Date(x.getFullYear(), x.getMonth(), x.getDay() + (y as Date).getDay() % 30);
        } else {
            const _neverHere: never = x;
            return _neverHere
        }
    }
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};

// keyof
// @errors: 2345
function getProperty<Type, Key extends (keyof Type & string)>(obj: Type, key: Key) {
    return obj[key];
}
const globalSymbolA = Symbol.for('a');
const x = { [globalSymbolA]: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(x, 'b'));
console.log(getProperty(x, "c"));

// generic constructors
// @strict: false
class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Animal {
    numLegs: number = 4;
}

class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// keyof indexed types
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
//   ^?

type Mapish = { [k: string]: string };
type M = keyof Mapish;
//   ^?

const arr: Arrayish = ['abc', 'def']
const keyOfA: A = 1;
console.log(arr[keyOfA])

const obj: Mapish = { [1]: 'abc', address: 'def' }
const keyOfM: M = 1;
console.log(obj[keyOfM])

//ReturnType using conditional types
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

type Predicate = (x: unknown) => boolean;
type K = MyReturnType<Predicate>;

function f() {
    return { x: 10, y: 3 };
}
type P = MyReturnType<typeof f>;

// component type inference
interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}
type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;
// ---cut---
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}
const a = createLabel("typescript");
const b = createLabel(2.8);
const c = createLabel(Math.random() ? "hello" : 42);

// flatten container types

type PromiseResolveType<T> = T extends Promise<infer R> ? PromiseResolveType<R> : T;

// Extracts out the element type.
type Str = PromiseResolveType<Promise<string[]>>;

// Leaves the type alone.
type date = PromiseResolveType<Promise<Promise<Promise<Date>>>>;
// Leaves the type alone.
type date2 = PromiseResolveType<Date>;


// Mapped types
// eslint-disable-next-line @typescript-eslint/ban-types
type Horse = {};
// ---cut---
type OnlyBoolsAndHorses = {
    [key: string]: string | Horse;
};

const conforms = {
    del: 'Del',
    rodney: new Date()
};

type KeyType = keyof OnlyBoolsAndHorses;
type ValueType = OnlyBoolsAndHorses[keyof OnlyBoolsAndHorses];
type ChangeListenerOptions<T> = {
    [Key in keyof T as `isLitening${Capitalize<string & Key>}`]: (arrg: T[Key]) => boolean;
}

const listeners: ChangeListenerOptions<typeof conforms> = {
    isLiteningDel: (name: string) => true,
    isLiteningRodney: (name: Date) => true,
    //   speedy: true
}

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: Date;
};

type UnlockedAccount = CreateMutable<LockedAccount>;


// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};

type User = Concrete<MaybeUser>;

// remapping keys via 'as'
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;