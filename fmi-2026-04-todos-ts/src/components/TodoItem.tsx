import { TodoStatus, type Todo } from '../model/todo'
import type { IdType } from '../shared/common-types';

export type TodoChangeListener = (todo: Todo) => void;

type Props = {
    todo: Todo;
    changeTodo: TodoChangeListener;
}

export default function TodoItem({ todo, changeTodo }: Props) {
    const completeTodo = () => { changeTodo({id: todo.id, text: todo.text, status: TodoStatus.COMPLETED}) }
    return (
        <li>{todo.id}: {todo.text} - {TodoStatus[todo.status]}
            <button className="btnComplete" onClick={completeTodo}>
                Complete
            </button>
        </li>
    )
}