import { useState } from 'react'
import './App.css'
import TodoList from './component/TodoList'
import { Todo } from './model/todo'
import TodoInput from './component/TodoInput'
import { ApiClient } from './service/api-client'
import useAsyncEffect from './hook/use-async-effect'

const BASE_URL = 'http://localhost:9000';

const API = new ApiClient(BASE_URL);

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [errors, setErrors] = useState<Error | undefined>(undefined)
  useAsyncEffect(async () => {
    const todos = await API.findAll(Todo);
    setTodos(todos);
  }, []);

  async function updateTodo(todo: Todo) {
    try {
      const updated = await API.update(Todo, todo);
      setTodos(oldTodos => oldTodos.map(td => td.id === todo.id ? updated : td))
    } catch (err) {
      setErrors(err as Error);
    }
  }
  
  async function createTodo(todo: Todo) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {id, ...dto} = todo;
      const created = await API.create(Todo, dto);
      setTodos(oldTodos => [...oldTodos, created]);
    } catch (err) {
      setErrors(err as Error);
    }
  }

  return (
    <>
      <h1>React TODOS Typescript Demo</h1>
      <TodoInput onCreateTodo={createTodo} onError={() => {}} />
      {errors && (<div className='errors'>{errors.message}</div>)}
      <TodoList todos={todos} changeStatus={updateTodo} />
    </>
  )
}

export default App
