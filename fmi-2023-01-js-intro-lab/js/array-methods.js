class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.pasword = password;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.name}, Password: ${this.pasword}`
    }
}

const users = [
    new User(1, 'john', 'john123'),
    new User(2, 'jane', 'jane123'),
    new User(3, 'jack', 'jack123'),
    new User(4, 'ivan', 'ivan123'),
]

// for(u of users) {
//     console.log(`<li>${u}</li>`);
// }

output = users.reduce((acc, usr) => `${acc}<li>${usr.toString()}</li>\n`, '');
console.log(output)