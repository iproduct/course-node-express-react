import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TodoList from './components/TodoList'
import { ApiClient } from './service/api-client'
import useAsyncEffect from './hook/use-async-effect'
import { Todo } from './model/todo'
import TodoInput from './components/TodoInput'
import TodoFilter from './components/TodoFilter'
import Version from './components/Version'

const BASE_URL = 'http://localhost:3000';

const API = new ApiClient(BASE_URL);

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [version, setVersion] = useState(0);
  const [error, setError] = useState<Error | undefined>();
  useAsyncEffect(async isUpdValid => {
    try {
      const tds = await API.findAll(Todo);
      if (isUpdValid && isUpdValid()) {
        setTodos(tds);
      }
    } catch (err) {
      setError(err as Error)
    }
  }, []);

  async function createTodo(todo: Todo) {
    try {
      const created = await API.create(Todo, todo);
      setTodos(tds => [...tds, created]);
    } catch (err) {
      setError(err as Error)
    }
  }

  async function updateTodo(todo: Todo){
     setTodos(todos => todos.map(td => td.id === todo.id ? todo : td));
  }

  return (
    <>
      <section className='container d-flex flex-column justify-content-between text-black bg-light'>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>React TS Todos</h1>
          <TodoInput onCreateTodo={createTodo} />
          <TodoFilter filter={filter} onFilterChange={setFilter} />
          {error && (<div className="invalid-feedback">{error.message}</div>)}
          <TodoList todos={todos} filter={filter} changeTodo={updateTodo}>
            <Version version={version} />
          </TodoList>
          <button type="button" className="btn btn-primary" onClick={() => setVersion(ver => ++ver)}>Update version</button>
        </div>
      </section>
    </>
  )
}

export default App
