const p1 = new Promise((resolve) => { setTimeout(resolve, 3000, 'one'); });

const p2 = new Promise((resolve) => { setTimeout(resolve, 2000, 'two'); });

const p3 = new Promise((res, reject) => { setTimeout(() => reject('rejected'), 1000, 'three'); });

Promise.race([p1, p2, p3]).then(v => console.log('Success:', v)).catch(err => console.log('Error:', err)).then(() => console.log('Demo finished'));


function f({ a, b = 0 } = { a: "!" }) { return [a, b] }
console.log([f({ a: "ok" }), f(), f({})]);

class Person {

    constructor(name) { this.name = name; this.username = name.split(/\s+/)[0].toLowerCase(); }

}

class Employee extends Person {

    constructor(name, organization) {
        super(name);
        this.name = name;
        this.organization = organization;
    }

    getInfo() { return `I'm ${this.name} [user: ${this.username}] from ${this.organization}`; }

}

let john = new Employee('Hristo Georgiev', 'Modis');

console.log(john.getInfo());


let calculatedP = new Map();

function p(number) {

    if (calculatedP.has(number)){return calculatedP.get(number)};
    let result = 0;

    if(number>=2) {
        result = 2*p(number - 1)+p(Math.trunc(number / 2));
        calculatedP.set(number,result);
        return result;
    }
    else {
        return number;
    }
}

console.log(p(3));