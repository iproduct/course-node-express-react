import { useCallback, useState, type SubmitEvent } from "react"
import { Todo, TodoStatus } from "../model/todo"

type Props = {
    onCreateTodo: (todo: Todo) => void,
    onError?: (error: Error) => void
}

function TodoInput({ onCreateTodo, onError }: Props) {
    const [text, setText] = useState('')
    const [status, setStatus] = useState(TodoStatus.ACTIVE)
    function resetTodo() {
        setText('');
        setStatus(TodoStatus.ACTIVE);
    }
    const submitTodo = useCallback((event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text.trim().length > 0) {
            const todo = new Todo(text, status);
            onCreateTodo(todo);
            resetTodo()
        } else {
            if (onError) {
                onError(new Error("All fields are required."));
            }
        }
  }, [text, status, onCreateTodo, onError]);
    
    return (
        <form onSubmit={submitTodo} onReset={resetTodo}>
            <input value={text} onChange={event => setText(event.target.value)} className="form-control" />
            <select value={status} onChange={event => setStatus(parseInt(event.target.value))} className="form-select">
                <option value={TodoStatus.ACTIVE}>Active</option>
                <option value={TodoStatus.COMPLETED}>Completed</option>
                <option value={TodoStatus.CANCELED}>Canceled</option>
            </select>
            <div>{text}</div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn">Reset</button>
            </div>
        </form>
    )
}

export default TodoInput