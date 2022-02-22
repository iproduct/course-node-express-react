import { ALL_STATUSES, TodoStatus } from "../model/todo-model";

const TodoList = ({ todos, filter, ...rest }) => (
    <ul className="TodoList">
        {todos.filter(todo => filter === ALL_STATUSES || todo.status === filter)
            .map(todo => (<li key={todo.id}>{todo.text} - {TodoStatus[todo.status]}</li>))
        }
    </ul>
);

export default TodoList;