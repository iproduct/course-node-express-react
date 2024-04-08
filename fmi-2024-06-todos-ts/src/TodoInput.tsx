import { FormEvent, useState } from 'react'
import { TodoCreateDto, TodoStatus } from './todo-model'

type Props = {
  onCreateTodo: (todo: TodoCreateDto) => void
  onError: (error: Error) => void
}

const TodoInput = ({ onCreateTodo, onError }: Props) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState(TodoStatus.Active);
  function submitTodo(event: FormEvent) {
    event.preventDefault();
    if(text.trim().length === 0) {
      onError(new Error('All fields are required'))
      return;
    }
    const todo = new TodoCreateDto(text, status);
    onCreateTodo(todo);
    resetTodo();
  }
  function resetTodo(event?: FormEvent) {
    setText('');
    setStatus(TodoStatus.Active);
  }
  return (
    <form onSubmit={submitTodo} onReset={resetTodo}>
      <input value={text} onChange={event => setText(event.target.value)} />
      <select value={status} onChange={event => setStatus(parseInt(event.target.value))}>
        <option value={TodoStatus.Active}>Active</option>
        <option value={TodoStatus.Completed}>Completed</option>
        <option value={TodoStatus.Canceled}>Canceled</option>
      </select>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  )
}

export default TodoInput;