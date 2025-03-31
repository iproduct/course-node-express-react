import { UserRepositoryInMemory } from "./dao/user-repository.js";
import { Admin, Reader, Author } from "./model/user.js";
import { UserServiceImpl } from "./service/user-service.js";
import { NumberIdGenrator } from "./util/idgen.js";
const resultsDiv = document.getElementById('results');
const users = [
    new Admin('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123'),
    new Reader('Hristo', 'Petrov', 'hristo@gmail.com', 'hristo123', { country: 'BG' }),
    new Author('Nadezda', 'Petrova', 'nadia@gmail.com', 'nadia123', { country: 'BG', address: 'Sofia 1000', phone: '+359887123456' }),
];
const userRepo = new UserRepositoryInMemory(new NumberIdGenrator());
users.forEach(user => userRepo.create(user));
console.log(userRepo.findAll());
resultsDiv.innerHTML = '<ul>' +
    userRepo
        .findAll().map(user => `<li>${user.toString()}</li>`)
        .reduce((acc, val) => acc + val, '')
    + '</ul>';
const userService = new UserServiceImpl(userRepo);
const loggedUser = userService.login({ email: 'trayan@gmail.com', password: 'trayan123' });
console.log('Logged user:', loggedUser);
