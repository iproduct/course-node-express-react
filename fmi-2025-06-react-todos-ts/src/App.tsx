import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { Todo } from './model/todo'
import TodoInput from './components/TodoInput'

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
  function updateTodo(todo: Todo) {
    setTodos(oldTodos => oldTodos.map(td => td.id === todo.id ? todo : td))
  }

  function createTodo(todo: Todo) {
    setTodos(oldTodos => [...oldTodos, todo])
  }

  return (
    <>
      <h1>React TODOS Typescript Demo</h1>
      <TodoInput onCreateTodo={createTodo} onError={() => {}} />
      <TodoList todos={todos} changeStatus={updateTodo} />
    </>
  )
}

export default App
