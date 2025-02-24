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

class Employee extends Person {
    constructor(fName, lName, age, address, company, salary) {
        super(fName, lName, age, address)
        this.company = company
        this.salary = salary
    }

    toString(){ 
        return super.toString() + `, company: ${this.company}, salary: ${this.salary}`
    }
}


const persons = [
    new Person('John', 'Smith', 25, 'London'),
    new Employee('John', 'Doe', 32, 'New York', 'ABC Ltd.', 50000),
    new Employee('Jane', 'Smith', 19, 'London', 'ABC Ltd.', 75000),
    new Person('Ivan', 'Petrov', 34, 'Sofia'),
    new Employee('Yulia', 'Hristova', 22, 'Plovdiv', 'ABC Ltd.', 85000),
]

persons.forEach(p => {
    console.log(p)
});

function calcTotalSalariesABC(persons, company) {
    return persons
        .filter(p => p instanceof Employee && p.company === company)
        .map(p => p.salary)
        .reduce((acc, current) => acc + current, 0)
}

console.log(calcTotalSalariesABC(persons, 'ABC Ltd.'))




