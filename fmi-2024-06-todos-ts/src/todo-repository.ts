import TODOS from "./mock-todos";
import { IdGeneratorNumber, Repository, RepositoryInMemory } from "./repository";
import { IdType } from "./shared-types";
import { Todo } from "./todo-model";

const TodoRepository: Repository<IdType, Todo> = new RepositoryInMemory<IdType, Todo>(
    new IdGeneratorNumber()
); // Singleton

// init repo with seed data
TODOS.map(td => TodoRepository.create(td));

export default TodoRepository;