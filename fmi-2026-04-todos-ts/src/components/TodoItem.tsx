import { TodoStatus, type Todo } from '../model/todo'

export type TodoChangeListener = (todo: Todo) => void;

type Props = {
    todo: Todo;
    changeTodo: TodoChangeListener;
}

export default function TodoItem({ todo, changeTodo }: Props) {
    const completeTodo = () => { changeTodo({ id: todo.id, text: todo.text, status: TodoStatus.COMPLETED }) }
    return (
        <div className="card my-1 d-flex flex-row justify-content-between">
                <span className="btn-group">{todo.id}: {todo.text} - {TodoStatus[todo.status]}</span>
                <span className="btn-group">
                    <button className="btn btn-success bi bi-calendar-check" onClick={completeTodo}></button>
                </span>
        </div>
    )
}