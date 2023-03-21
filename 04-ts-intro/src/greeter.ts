import { Person } from './model/person';
//@strict: false
//@strictPropertyInitialization: false

import { UserBase, Role, User } from './model/user.js';

function greeter(user: User, date?: Date): string;
function greeter(user: string, date?: Date): string;

function greeter(user: UserBase | string, date: Date = new Date()): string {
    // if (typeof user === "string") {
    if (user instanceof UserBase) {
        return `[${date.toDateString()}] Hello ${user.firstName} ${user.lastName} from ${user.contact?.country || 'BG'} in Roles: 
       ${user.roles.map(role => Role[role]).join(', ')}`;

    }
    return `[${date.toDateString()}] ${user}`;

}

const user1 = new UserBase('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', [Role.AUTHOR, Role.ADMIN],
    { country: 'BG', address: 'Sofia, 1000' });

// document.getElementById('results')!.innerHTML = greeter(user1);
const elem = document.getElementById('results');
if (elem !== null) {
    elem.innerHTML = greeter(user1, new Date('1995-11-22T03:45:23')) + '<br>';
    elem.innerHTML += greeter("Trayan");
}

const name = 'Georgi';
// name += ' Petrov';
console.log(name);

function example(x: string | number, y: string | boolean) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        console.log(x.toUpperCase());
        console.log(y.toLowerCase());
    } else {
        console.log(x);
        console.log(y);
    }
}

example('Abc', 'Abc')

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
    if ("swim" in animal) {
        return animal.swim();
    }
    return animal.fly();
}

let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);
x = "goodbye!";
console.log(x);

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    } else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x.toUpperCase());
    }
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
function getSmallPet() {
    return Math.random() < 0.5 ? { swim() { return } } as Fish : { fly() { return } } as Bird;
}
const pet = getSmallPet();

if (isFish(pet)) {
    // if ("swim" in pet) {
    pet.swim();
} else {
    pet.fly();
}

// interface Shape {
//     kind: "circle" | "square";
//     radius?: number;
//     sideLength?: number;
// }

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

// function getArea(shape: Shape) {
//     if(shape.kind === "circle") {
//         return Math.PI * shape.radius** 2;
//     } else {
//         return shape.sideLength ** 2;
//     }
// }


function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
    console.log(s.toUpperCase());
});

// function printCoord(pt: {x: number; y: number}) {
//     console.log("The coordinate's x value is " + pt.x);
//     console.log("The coordinate's y value is " + pt.y);
// }
printCoord({ x: 3, y: 7 });

// type Point = {
//     x: number;
//     y: number;
// };

interface Point {
    x: number;
    y: number;
}

// Exactly the same as the earlier example
function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });


// Functions
type GreetFunction = (a: string) => void;

interface GreetFunction2 {
    (a: string): void;
    description?: string;
}

function greeter2(fn: GreetFunction2) {
    fn("Hello, World" + " - " + (fn.description || 'no description'));
}

function printToConsole(s: string) {
    console.log(s);
}

printToConsole.description = "Greeter function";

greeter2(printToConsole); // HOF

class SomeObject {
    constructor(public name: string) { }
}
class SomeOtherObject {
    constructor(public name: string) { }
}

type SomeConstructor = {
    new(s: string): SomeObject;
};
type SomeOtherConstructor = {
    new(s: string): SomeOtherObject;
};
function fn(ctor: SomeConstructor | SomeOtherConstructor) { //HOF
    return new ctor("hello");
}

console.log(Math.random() > 0.5 ? fn(SomeObject) : fn(SomeOtherObject));


// Genric function
function firstElement<T>(arr: T[]) {
    return arr[0];
}

console.log(firstElement(["abc", "def"]).toUpperCase());

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] { // HOF
    return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map([user1, user1], (u) => u.firstName + ' ' + u.lastName);
console.log(parsed)

type Long = { length: number }

function longest<Type extends Long>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray)
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString)
// Error! Numbers don't have a 'length' property
//   const notOK = longest(10, 100);

// function minimumLength<Type extends { length: number }>(
//     obj: Type,
//     minimum: number
// ): Type {
//     if (obj.length >= minimum) {
//         return obj;
//     } else {
//         return { length: minimum };
//     }
// }