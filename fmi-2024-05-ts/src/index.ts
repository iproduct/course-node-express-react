import { Person, PersonImpl, Role, UserImpl } from "./users.js";


const users: Person[] = [
    new UserImpl(1, 'John', 'Doe', 'john@gmail.com', 'john123', { country: 'BG', city: 'Sofia', address: 'J. Bouchoier, 12' },
        [Role.Reader, Role.Author, Role.Admin]),
    new UserImpl(2, 'Jane', 'Doe', 'jane@gmail.com', 'jane123', { country: 'GB', }, [Role.Reader, Role.Author]),
    new UserImpl(3, 'Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123'),
    new PersonImpl(4, 'Ivan', 'Petrov', 'ivan@gmail.com')
];

const contentElem = document.getElementById('content');
const usersItemsStr = users.map(u => `<li>${u.salutation}</li>`).join('');
if (contentElem) {
    contentElem.innerHTML = `<ul>${usersItemsStr}</ul>`;
}