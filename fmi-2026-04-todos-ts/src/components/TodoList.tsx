import { type Todo } from '../model/todo'
import TodoItem, { type TodoChangeListener } from './TodoItem'

type Props = { 
    todos: Todo[];
    changeTodo: TodoChangeListener;
 }

const TodoList = ({ todos, ...rest }: Props) => {
    return (
        <>
            <div>TodoList:</div>
            <ul>
                {todos.map(todo => (<TodoItem todo={todo} {...rest} />))}
            </ul>
        </>
    )
}

export default TodoList