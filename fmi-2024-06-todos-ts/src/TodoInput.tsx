import { FormEvent, useCallback, useState } from 'react'
import { TodoCreateDto, TodoStatus } from './todo-model'

type Props = {
  onCreateTodo: (todo: TodoCreateDto) => void
  onError: (error: Error) => void
}

const TodoInput = ({ onCreateTodo, onError }: Props) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState(TodoStatus.Active);
  const submitTodo = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (text.trim().length === 0) {
        onError(new Error('All fields are required'))
        return;
      }
      const todo = new TodoCreateDto(text, status);
      onCreateTodo(todo);
      resetTodo();
    },
    [text, status, onCreateTodo, onError],
  )
  
  function resetTodo(event?: FormEvent) {
    setText('');
    setStatus(TodoStatus.Active);
  }
  return (
    <form onSubmit={submitTodo} onReset={resetTodo} className='my-2'>
      <input value={text} onChange={event => setText(event.target.value)} className="form-control" placeholder="What to do next?" />
      <select value={status} onChange={event => setStatus(parseInt(event.target.value))} className="form-select">
        <option value={TodoStatus.Active}>Active</option>
        <option value={TodoStatus.Completed}>Completed</option>
        <option value={TodoStatus.Canceled}>Canceled</option>
      </select>
      <div className="d-flex flex-row">
        <button type="submit" className="btn btn-success ms-2">Submit</button>
        <button type="reset" className="btn btn-danger ms-2">Reset</button>
      </div>
    </form>
  )
}

export default TodoInput;