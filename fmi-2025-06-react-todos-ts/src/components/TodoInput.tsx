import { FormEvent, useState } from 'react';
import { Todo, TodoStatus } from '../model/todo'
import './TodoInput.css'

type Props = {
    onCreateTodo: (todo: Todo) => void;
    onError: (error: Error) => void;
}

const TodoInput = ({onCreateTodo, onError}: Props) => {
    const [text, setText] = useState('');
    const [status, setStatus] = useState(TodoStatus.ACTIVE);
    function submitTodo(event: FormEvent) {
        event.preventDefault();
        if(text.trim().length === 0) {
            onError(new Error('All fields are required'))
            return
        }
        const todo = new Todo(text, status);
        onCreateTodo(todo);
        resetTodo();
    }
    function resetTodo() {
        setText('');
        setStatus(TodoStatus.ACTIVE);
    }
    return (
        <form onSubmit={submitTodo} onReset={resetTodo}>
            <input value={text} onChange={event => setText(event.target.value)} />
            <select value={status} onChange={event => setStatus(parseInt(event.target.value))}>
                <option value={TodoStatus.ACTIVE}>Active</option>
                <option value={TodoStatus.COMPLETED}>Completed</option>
            </select>
            <div className='buttons'>
                <button type='submit'>Submit</button>
                <button type='reset'>Reset</button>
            </div>
        </form>
    )
}

export default TodoInput