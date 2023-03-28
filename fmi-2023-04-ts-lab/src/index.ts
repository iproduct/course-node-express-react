import { NumberIdGenerator } from './dao/repository.js';
import { UserRepository, UserRepositoryImpl } from './dao/user-repository.js';
import { LoginServiceImpl } from './domain/login-service.js';
import { Role, UserBase, UserCreateDto } from './model/users.js';
const userRepo = new UserRepositoryImpl(new NumberIdGenerator());
const loginService = new LoginServiceImpl(userRepo);

// fill-in sample users
const users = [
    new UserCreateDto('trayan', 'trayan123', [Role.Reader, Role.Author, Role.Admin], 'Trayan', 'Iliev', 'trayan@gmail.com'),
    new UserCreateDto('john', 'john123', [Role.Reader], 'John', 'Doe', 'john@gmail.com'),
    new UserCreateDto('jane', 'jane123', [Role.Reader, Role.Author], 'Jane', 'Doe', 'jane@gmail.com'),

];
const createdUsers = users.map(user => userRepo.create(user));
console.log(createdUsers);

// Login demo
const loggedIn = loginService.login(createdUsers[0]);
console.log('Logged-in as: ', loggedIn);

// show created users
const demoElem = document.getElementById('demo');
if(demoElem) {
    demoElem.innerHTML = `${JSON.stringify(createdUsers)}<br><br>Logged-in as: ${loggedIn?.username}`;
} else {
    console.log("Eror: Demo <div> does not exist!")
}
