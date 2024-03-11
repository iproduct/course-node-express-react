const ADMIN = 0;
const AUTHOR = 1;
const READER = 2;

const Role = ['ADMIN', 'AUTHOR', 'READER'];

class Person {
    static nextId = 0;
    id = ++Person.nextId;
    constructor(fName, lName, address) {
        this.fName = fName;
        this.lName = lName;
        this.address = address;
    }

    toString() {
        return `${this.id}: ${this.fName} ${this.lName}, ${this.address}`;
    }
}

class User extends Person {
    constructor(fName, lName, address, username, password, role) {
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }

    toString() {
        return `${super.toString()}, user: ${this.username}, pass: ${this.password} - ${Role[this.role]}`
    }
}

const users = [
    new User('John', 'Doe', 'London, UK', 'john', 'john123', ADMIN),
    new User('Jane', 'Doe', 'New York, USA', 'jane', 'jhane123', AUTHOR),
    new User('Nadezda', 'Petrova', 'Sofia, BG', 'nadia', 'nadia123', READER),
    new Person('Georgi', 'Petrov', 'Varna')
];

for (user of users) {
    console.log(user.toString());
}
