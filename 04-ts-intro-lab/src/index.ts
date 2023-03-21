import { NumberIdGenerator } from './dao/id-generator.js';
import { UserRepository, UserRepositoryMemoryImpl } from './dao/user-repository.js';
import { Admin, Author, getExtraData, Reader, User, UserType } from './model/users.js';

// function greeter(person: string) {
//     return `Hi ${person} from TypeScript!`
// }

const users: User[] = [
    new Admin('Default', 'Admin', 'admin@mycompany.com', 'admin123', [2,3,4]),
    new Author('Default', 'Author', 'author@mycompany.com', 'author123', ['React is Easy', 'TypeScript Disciminated Unions']),
    new Reader('Default', 'Reader', 'reader@mycompany.com', 'reader123', ['TypeScript Disciminated Unions']),
    new Reader('John', 'Doe', 'john@gmail.com', 'john123',['React is Easy']),
    new Admin('Jane', 'Doe', 'jane@gmail.com', 'jane123', [1]),
];

const userRepo: UserRepository = new UserRepositoryMemoryImpl(new NumberIdGenerator());
users.forEach(user => userRepo.create(user));
// const john = userRepo.findByEmail('john@gmail.com');
// if (john) {
//     const johnEdited = new UserBase(john);
//     johnEdited.password = 'new_password';
//     userRepo.update(johnEdited);
// }
// const jane = userRepo.findByEmail('jane@gmail.com');
// if (jane) {
//     console.log(`Successfully deleted: ${userRepo.deleteById(jane.id)}`);
// }

const resultsElem = document.getElementById('results');
if (resultsElem) {
    userRepo.findAll().forEach(user => {
        const elem = document.createElement('div');
        elem.innerHTML = user.toString() + `, Extra data: ${getExtraData(user as UserType)}` ;
        resultsElem.insertAdjacentElement('beforeend', elem);
    });
}

