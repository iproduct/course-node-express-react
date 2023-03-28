/* eslint-disable @typescript-eslint/no-unused-vars */
type Person = { age: number; name: string; alive: boolean };

type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

// Type inference
export const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];

type Person2 = typeof MyArray[number];

type Age = typeof MyArray[number]["age"];

type Age2 = Person2["age"];


// 