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
        return `ID: ${this.id}, Name: ${this.fName + ' ' + this.lName}, Address: ${this.address}`;
    }
}

class User extends Person {
    constructor(fName, lName, address, username, password, role=READER) {
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // override base method
    toString() {
        return `${super.toString()}, Username: ${this.username}, Password: ${this.password}, Role: ${Role[this.role]}`;
    }
}

const p1 = new Person('John', 'Doe', "London, GB");
const p2 = new Person('Jahn', 'Doe', "Liverpool, GB");
const p3= new Person('Jim', 'Doe', "London, GB");
const persons = [p1, p2, p3];
// persons.forEach(p => console.log(p.toString()));
const u1= new User('Ivan', 'Petrov', "Sofia, BG", 'ivan', 'ivan123', ADMIN);
const u2= new User('Hrisitna', 'Zeliazkova', "New York, US", 'hrisi', 'hrisi123', AUTHOR);
const u3= new User('Dimitar', 'Hristov', "Sofia, BG", 'mitko', 'mitko123');
const users = [u1, u2, u3];
const allPersons = [...persons, ...users];
allPersons.forEach(p => console.log(p.toString()));
