import { UserRepository, UserRepositoryInMemory } from "./dao/user-repository.js"
import { greet } from "./greeter.js"
import { Credentials } from "./model/credentials.js"
import { Admin, Reader, Author, UserBase, User } from "./model/user.js"
import { UserService, UserServiceImpl } from "./service/user-service.js"
import { NumberIdGenrator } from "./util/idgen.js"

const resultsDiv = document.getElementById('results')

const users = [
    new Admin('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123'),
    new Reader('Hristo', 'Petrov', 'hristo@gmail.com', 'hristo123', { country: 'BG' }),
    new Author('Nadezda', 'Petrova', 'nadia@gmail.com', 'nadia123', { country: 'BG', address: 'Sofia 1000', phone: '+359887123456' }),
]

const userRepo: UserRepository = new UserRepositoryInMemory(new NumberIdGenrator())
users.forEach(user => userRepo.create(user))

console.log(userRepo.findAll() as User[])

resultsDiv!.innerHTML = '<ul>' +
    userRepo
        .findAll().map(user => `<li>${user.toString()}</li>`)
        .reduce((acc, val) => acc + val, '')
    + '</ul>';

const userService: UserService = new UserServiceImpl(userRepo);
// const loggedUser = userService.login({email: 'trayan@gmail.com', password:'trayan123'});
const loggedUser = userService.login(new Credentials('trayan@gmail.com', 'trayan123'));
console.log('Logged user:', loggedUser);