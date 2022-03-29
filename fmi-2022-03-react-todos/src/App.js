import { useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import MOCK_TODOS from './model/mock-todos';

function App() {
  const [todos, setTodos] = useState(MOCK_TODOS)
  function deleteTodo(deleted) {
    setTodos(oldTodos => oldTodos.filter(td => td.id !== deleted.id));
  }
  function statusChanged(changedTodo) {
    setTodos(oldTodos => oldTodos.map(td => td.id === changedTodo.id? changedTodo : td))
  }
  return (
    <div className="App-header">
      <h1>React TODOs Demo</h1>
      <TodoInput onSubmitTodo={todo => setTodos(oldTodos => [...oldTodos, todo])} />
      <TodoList todos={todos} onDelete={deleteTodo} onStatusChange={statusChanged}/>
    </div>
  );
}

export default App;
