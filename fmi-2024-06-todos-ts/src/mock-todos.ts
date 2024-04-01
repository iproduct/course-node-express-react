import { Todo, TodoCreateDto, TodoStatus} from "./todo-model"

const TODOS = [
    new TodoCreateDto('Create TODO App using create-react-app', TodoStatus.Completed),
    new TodoCreateDto('Create TodoApp function component'),
    new TodoCreateDto('Create TodoList function component'),
    new TodoCreateDto('Create TodoItem function component'),
    new TodoCreateDto('Create TodoInput function component'),
    new TodoCreateDto('Connect todos app to backend with json-server'),
    new TodoCreateDto('Create TodoFilter function component'),
    new TodoCreateDto('Improve component styling'),
];

export default TODOS;