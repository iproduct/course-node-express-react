import { IdGeneratorNumber } from "./repository.js";
import { UserRepository, UserRepositoryInMemory } from "./user-repository.js";
import { Role, User, UserDto } from "./users.js";

type UserCreateDTO = Omit<User, "id">

const users: UserCreateDTO[] = [
    new UserDto('John', 'Doe', 'john@gmail.com', 'john123', { country: 'BG', city: 'Sofia', address: 'J. Bouchoier, 12' },
        [Role.Reader, Role.Author, Role.Admin]),
    new UserDto('Jane', 'Doe', 'jane@gmail.com', 'jane123', { country: 'GB', }, [Role.Reader, Role.Author]),
    new UserDto('Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123'),
];

// UserRepo demo
const userRepo: UserRepository = new UserRepositoryInMemory(new IdGeneratorNumber());
users.forEach(u => userRepo.create(u));

// update user in repo
const jane = userRepo.findByEmail('jane@gmail.com');
if (jane) {
    jane.roles.push(Role.Admin);
    jane.contact = { country: 'NW' }
    userRepo.update(jane);
    // delete user demo
    const deleted = userRepo.deleteById(jane.id);
    console.log(`Successfully deleted user: "${deleted?.email}"`) 
    // try to update unexisitng user
    const updated = userRepo.update(jane);
    console.log(`Updated user: "${updated?.email}"`)
}

const contentElem = document.getElementById('content');
const usersItemsStr = userRepo.findAll().map(u => `<li>${u.salutation}</li>`).join('');
if (contentElem) {
    contentElem.innerHTML = `<ul>${usersItemsStr}</ul>`;
}

// other demos
const tuple: [number, string, boolean] = [7, "hello", true];
const [a, b, c] = tuple;
console.log(a, b, c);
const [a1, ...rest] = tuple;
console.log(a1, rest)
