"use strict";
//1. typeof narowing
function padLeft(padding, input) {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}
console.log(padLeft(12, "Hello"));
console.log(padLeft("____________", "Hello"));
// 2. equality narrowing
function printAll(strs) {
    if (typeof strs === "object") {
        // 3. falsy narrowing
        if (strs) {
            for (const s of strs) {
                console.log(s);
            }
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
    else {
        // do nothing
    }
}
printAll(null);
printAll("hello");
printAll(["hello", "world"]);
function move(animal) {
    if ("swim" in animal) {
        return animal.swim();
    }
    return animal.fly();
}
function getSmallPet() {
    return Math.random() < 0.5 ? {
        name: `Fish${Math.floor(Math.random() * 100)}`,
        swim() {
            console.log("Fish is swimming");
            return;
        }
    }
        : {
            name: `Bird${Math.floor(Math.random() * 100)}`,
            fly() { console.log("Bird is flying"); return; }
        };
}
move(getSmallPet());
// 5. type predicate narrowing
function isFish(pet) {
    return pet.swim !== undefined;
}
// ---cut---
// Both calls to 'swim' and 'fly' are now okay.
const pet = getSmallPet();
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
const zoo = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
if (isFish(zoo[3])) {
    zoo[3].name = 'sharkey';
}
console.log(zoo);
const underWater1 = zoo.filter(isFish);
console.log(underWater1);
// or, equivalently
const underWater2 = zoo.filter(isFish);
console.log(underWater2);
// The predicate may need repeating for more complex examples
const underWater3 = zoo.filter((pet) => {
    if (isFish(pet) && pet.name === "sharkey")
        return false;
    return isFish(pet);
});
console.log(underWater3);
//# sourceMappingURL=type-narrowing.js.map