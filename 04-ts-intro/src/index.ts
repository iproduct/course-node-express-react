import { NumberIdGenerator } from './dao/id-generator.js';
import { UserRepository, UserRepositoryImpl } from './dao/user-repository.js';
import { Admin, Author, Reader, User } from './model/user.js';

const users: User[] = [
    new Reader('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', { country: 'BG', address: 'Sofia, 1000' }),
    new Author('John', 'Doe', 'john@gmail.com', 'john123', { country: 'USA', address: 'New York' }),
    new Admin('Jane', 'Doe', 'jane@gmail.com', 'jane123', { country: 'USA', address: 'San Francisko' }),
];

const userRepo: UserRepository  = new UserRepositoryImpl(new NumberIdGenerator());
users.forEach(user => userRepo.create(user));

const allUsers = userRepo.findAll();
const trayan = userRepo.findByEmail('trayan@gmail.com');
console.log('Found by email:', trayan);

document.getElementById('results')!.innerHTML = allUsers.map(user => user.toString()).join('<br>');
