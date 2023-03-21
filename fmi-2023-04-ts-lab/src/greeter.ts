import { NaturalPerson, Person } from './model/person.js';

function greet(person: Person) {
    return `Hello ${person.toString()}, from TypeScript!`;
}

const p1: Person = new NaturalPerson(1, 'Trayan', 'Iliev', 'trayan@gmail.com');

document.getElementById('demo')!.innerHTML = greet(p1);
