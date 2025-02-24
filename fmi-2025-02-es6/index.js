'use strict'

class Person {
    static nextId = 0
    static getNextId() {
        return ++Person.nextId
    }
    constructor(fName, lName, age, address) {
        this.id = Person.getNextId()
        this.fName = fName
        this.lName = lName
        this.age = age
        this.address = address
    }

    toString(){ 
        return `${id}: ${this.fName} ${this.lName}, age: ${this.age}, address: ${this.address}`
    }
}

const persons = [
    new Person('John', 'Smith', 25, 'London'),
    new Person('John', 'Doe', 32, 'New York'),
    new Person('Jane', 'Smith', 19, 'London'),
    new Person('Ivan', 'Petrov', 34, 'Sofia'),
    new Person('Yulia', 'Hristova', 22, 'Plovdiv'),
]

persons.forEach(p => {
    console.log(p)
});