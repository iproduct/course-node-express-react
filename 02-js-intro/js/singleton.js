let instance;
let counter = 0;

class Counter {
    static #theInstance = new Counter()
    constructor() {
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
    }

    static getInstance() {
        return Counter.#theInstance;
    }

    getCount() {
        return counter;
    }

    increment() {
        return ++counter;
    }

    decrement() {
        return --counter;
    }
}

// const counter1 = new Counter();
// const counter2 = new Counter();
const counter1 = Counter.getInstance();
const counter2 = Counter.getInstance();
console.log(Object.is(counter1, counter2))
// Error: You can only create one instance!