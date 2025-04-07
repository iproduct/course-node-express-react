import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import { Todo } from './model/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
    setTodos([
      new Todo('Create Todo App component.'),
      new Todo('Create TodoList component.'),
      new Todo('Create TodoItem component.'),
      new Todo('Create TodoInput component.'),
      new Todo('Connect todos app to backend with json-server.'),
      new Todo('Create TodoFilter component.'),
      new Todo('Improve compoent styling.'),
    ])
  }, [])

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
