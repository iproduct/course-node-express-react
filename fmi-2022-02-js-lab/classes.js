class Person {
    static nextId = 0;
    id = ++Person.nextId;
    constructor(fName, lName, address) {
       this.fName = fName;
       this.lName = lName;
       this.address = address
    }
    toString() {
        return `ID: ${this.id}, name: ${this.fName + ' ' + this.lName}, address: ${this.address}`;
    }
}

class User extends Person {
    constructor(fName, lName, address, username, password, role){
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }

    toString() {
        return `${super.toString()}, username: ${this.username}, password: ${this.password}, role: ${this.role}`;
    }
}


const p1 = new Person('Georgi', 'Petrov', 'Sofia 1000');
console.log(p1.toString())
const p2 = new Person('Ivan', 'Petrov', 'Sofia 1000');
console.log(p2.toString())

const u1 = new User('Hristo', 'Dimitrov', 'Plovidiv', 'hristo', 'hristo', 'ADMIN');
const u2 = new User('Vesela', 'Dimitrova', 'Plovidiv', 'vesela', 'vesela', 'AUTHOR');
const u3 = new User('Stanislav', 'Vasilev', 'Ruse', 'stan', 'stan123', 'READER');

const users = [u1, p1, u2, p2, u3];

function printUsers(users){
    users.forEach((u, i) => console.log(`${i+1}: ${u.toString()}`));
}

printUsers(users)