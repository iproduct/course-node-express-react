import { IdGeneratorNumber } from "./dao/impl/id-generator-number.js";
import { RepositoryInMemmory } from "./dao/impl/repository-in-memory.js";
import { Repository } from "./dao/repository.js";
import { greeter } from "./greeter.js";
import { Post } from "./model/posts.js";
import { Role, User, UserCreateDto } from "./model/users.js";


const i = 1
const trayan = new UserCreateDto('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', [Role.Reader, Role.Author, Role.Admin]);
const demoUsers = [
    trayan, 
    new UserCreateDto('John', 'Doe', 'john@gmail.com', 'john123', [Role.Reader, Role.Author]),
    new UserCreateDto('Jane', 'Doe', 'jane@gmail.com', 'jane123', [Role.Author]),
]

const post1 = new Post(1, 'Intro to TypeScript',`TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
    `,['typscript', 'introduction', 'programming'],
    'https://www.freepik.com/free-photo/side-shot-code-editor-using-react-js_131907798.htm#fromView=keyword&page=1&position=0&uuid=8150ff3f-5c37-4ac1-af25-ef9f041920c2&query=Typescript');

const userRepo: Repository<User> = new RepositoryInMemmory<User>(new IdGeneratorNumber(0));

demoUsers.forEach(u => userRepo.create(u));

const allUsers = userRepo.findAll();

const contentElem = document.getElementById('content');
if (contentElem) {
    contentElem.innerHTML = greeter(trayan.salutation);
}
const usersElem = document.getElementById('users');
if (usersElem) {
    usersElem.innerHTML =allUsers
    .map(u => `<li>${u.salutation}</li>`)
    .join("\n");
}
const postsElem = document.getElementById('posts');
if (postsElem) {
    postsElem.innerHTML =`<li>${post1.title} [${post1.keywords.join(', ')}]: ${post1.content}</li>`;
}