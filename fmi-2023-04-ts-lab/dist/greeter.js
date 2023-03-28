import { Role, UserBase } from './model/users.js';
import { NaturalPerson } from './model/person.js';
function greet(person) {
    return `Hello ${person.greeting}, from TypeScript!`;
}
function login(user) {
    return `Logged in as: ${user.username}`;
}
const p1 = new NaturalPerson(1, 'Trayan', 'Iliev', 'trayan@gmail.com');
const u1 = new UserBase(1, 'trayan', 'trayan123', [Role.Reader, Role.Author, Role.Admin], 'Trayan', 'Iliev', 'trayan@gmail.com');
document.getElementById('demo').innerHTML = greet(p1) + '<br>' + greet(u1);
//# sourceMappingURL=greeter.js.map