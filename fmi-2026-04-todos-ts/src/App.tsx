import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hello from './components/Hello'
import TodoList from './components/TodoList'
import { SAMPLE_TODOS } from './model/sample-todos'

function App() {
  const [todos, setTodos] = useState(SAMPLE_TODOS);

  return (
    <>
      <section id="center">
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
