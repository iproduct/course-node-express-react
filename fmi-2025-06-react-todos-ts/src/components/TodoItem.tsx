import { Todo, TodoStatus } from '../model/todo';
import './TodoItem.css';

type Props = {
    todo: Todo;
    changeStatus: (Todo: Todo) => void;
}

const TodoItem = ({ todo, changeStatus }: Props) => {
    function completeTodo() {
        const updatedTodo = { ...todo, status: TodoStatus.COMPLETED };
        changeStatus(updatedTodo);
    }
    return (
        <div className='TodoItem-card'>
            <div className='content'>{todo.id}: {todo.text} [{TodoStatus[todo.status]}]</div>
            <div className='buttons'>
                <button className='button' onClick={completeTodo}>Complete</button>
            </div>
        </div>
    )
}

export default TodoItem