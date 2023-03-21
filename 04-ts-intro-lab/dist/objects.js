"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
// interface Shape {} // === any
// declare function getShape(): Shape;
// ---cut---
function paintShape({ shape, xPos = 0, yPos = 0 }) {
    console.log("x coordinate at", xPos);
    //                             ^?
    console.log("y coordinate at", yPos);
    //                             ^?
    // ...
}
// readonly array
// function doStuff(values: readonly string[]) {
function doStuff(values) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    // ...but we can't mutate 'values'.
    // values.splice(0, 2, "hello!");
}
// tuple destructuring
function doSomething2([inputString, hash]) {
    console.log(inputString);
    console.log(hash);
}
doSomething2(['abc', 42]);
//# sourceMappingURL=objects.js.map