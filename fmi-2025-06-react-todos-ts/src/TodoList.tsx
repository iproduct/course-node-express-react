import { Todo } from './model/todo'

type Props = {
    todos: Todo[]
}

const TodoList = (props: Props) => {
    return (
        <>
            <div>TodoList</div>
            <div>{props ? 'Todos here ...' : 'No todos yet.'}</div>
        </>
    )
}

export default TodoList