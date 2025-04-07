import { Todo, TodoStatus } from './model/todo'

type Props = {
    todos: Todo[]
}

const TodoList = ({ todos }: Props) => {
    return (
        todos.map(todo => (
        <div key={todo.id} className='card'>{todo.id}: {todo.text} [{TodoStatus[todo.status]}]</div>)
    ))
}

export default TodoList