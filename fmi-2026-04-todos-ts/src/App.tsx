import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TodoList from './components/TodoList'
import { ApiClient } from './service/api-client'
import useAsyncEffect from './hook/use-async-effect'
import { Todo } from './model/todo'

const BASE_URL = 'http://localhost:3000';

const API = new ApiClient(BASE_URL);

function App() {
  const [todos, setTodos] = useState([]);
  useAsyncEffect(async () => {
    const todos = await API.findAll(Todo);
    setTodos(todos);
  }, []);

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
          <TodoList todos={todos} 
          changeTodo={(todo) => setTodos(todos => todos.map(td => td.id === todo.id ? todo: td))}/>
        </div>
      </section>
    </>
  )
}

export default App
