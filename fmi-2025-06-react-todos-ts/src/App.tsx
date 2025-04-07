import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'

function App() {
  const [todos, setTodos] = useState([])

  return (
    <>
      <h1>React TODOS Typescript Demo</h1>
      <TodoList todos={todos} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
