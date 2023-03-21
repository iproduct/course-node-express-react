//@strict: false
//@strictPropertyInitialization: false
import { UserBase, Role } from './model/user.js';
function greeter(user, date = new Date()) {
    var _a;
    // if (typeof user === "string") {
    if (user instanceof UserBase) {
        return `[${date.toDateString()}] Hello ${user.firstName} ${user.lastName} from ${((_a = user.contact) === null || _a === void 0 ? void 0 : _a.country) || 'BG'} in Roles: 
       ${user.roles.map(role => Role[role]).join(', ')}`;
    }
    return `[${date.toDateString()}] ${user}`;
}
const user1 = new UserBase('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', [Role.AUTHOR, Role.ADMIN], { country: 'BG', address: 'Sofia, 1000' });
// document.getElementById('results')!.innerHTML = greeter(user1);
const elem = document.getElementById('results');
if (elem !== null) {
    elem.innerHTML = greeter(user1, new Date('1995-11-22T03:45:23')) + '<br>';
    elem.innerHTML += greeter("Trayan");
}
const name = 'Georgi';
// name += ' Petrov';
console.log(name);
function example(x, y) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        console.log(x.toUpperCase());
        console.log(y.toLowerCase());
    }
    else {
        console.log(x);
        console.log(y);
    }
}
example('Abc', 'Abc');
function move(animal) {
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
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    }
    else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x.toUpperCase());
    }
}
function isFish(pet) {
    return pet.swim !== undefined;
}
// Both calls to 'swim' and 'fly' are now okay.
function getSmallPet() {
    return Math.random() < 0.5 ? { swim() { return; } } : { fly() { return; } };
}
const pet = getSmallPet();
if (isFish(pet)) {
    // if ("swim" in pet) {
    pet.swim();
}
else {
    pet.fly();
}
// function getArea(shape: Shape) {
//     if(shape.kind === "circle") {
//         return Math.PI * shape.radius** 2;
//     } else {
//         return shape.sideLength ** 2;
//     }
// }
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return Math.pow(shape.sideLength, 2);
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
// Exactly the same as the earlier example
function printCoord(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
function greeter2(fn) {
    fn("Hello, World" + " - " + (fn.description || 'no description'));
}
function printToConsole(s) {
    console.log(s);
}
printToConsole.description = "Greeter function";
greeter2(printToConsole); // HOF
class SomeObject {
    constructor(name) {
        this.name = name;
    }
}
class SomeOtherObject {
    constructor(name) {
        this.name = name;
    }
}
function fn(ctor) {
    return new ctor("hello");
}
console.log(Math.random() > 0.5 ? fn(SomeObject) : fn(SomeOtherObject));
// Genric function
function firstElement(arr) {
    return arr[0];
}
console.log(firstElement(["abc", "def"]).toUpperCase());
function map(arr, func) {
    return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map([user1, user1], (u) => u.firstName + ' ' + u.lastName);
console.log(parsed);
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString);
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
//# sourceMappingURL=greeter.js.map