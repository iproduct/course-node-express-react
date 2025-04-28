import { useMemo, useState } from 'react'
import './App.css'
import TodoList from './component/TodoList'
import { Todo } from './model/todo'
import TodoInput from './component/TodoInput'
import { ApiClient } from './service/api-client'
import useAsyncEffect from './hook/use-async-effect'
import TodoFilter, { TodoFilterType } from './component/TodoFilter'

const BASE_URL = 'http://localhost:9000';

const API = new ApiClient(BASE_URL);

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoFilterType>()
  const [errors, setErrors] = useState<Error | undefined>(undefined)
  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter]
  );
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

  function filterTodos(todos: Todo[], filter: TodoFilterType) {
    return todos.filter(todo => !filter || todo.status === filter)
  }

  return (
    <>
      <h1>React TODOS Typescript Demo</h1>
      <TodoInput onCreateTodo={createTodo} onError={() => {}} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      {errors && (<div className='errors'>{errors.message}</div>)}
      <TodoList todos={filteredTodos} changeStatus={updateTodo} />
    </>
  )
}

export default App
