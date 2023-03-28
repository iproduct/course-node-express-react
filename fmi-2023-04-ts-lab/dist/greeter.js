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
const demoElem = document.getElementById('demo');
if (demoElem) {
    demoElem.innerHTML = greet(p1) + '<br>' + greet(u1);
}
else {
    console.log("Eror: Demo <div> does not exist!");
}
//# sourceMappingURL=greeter.js.map