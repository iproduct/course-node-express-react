import logo from './logo.svg';
import './App.css';
import TodoList from './componants/TodoList';
import MOCK_TODOS from './model/mock-todos';
import { ALL_STATUSES } from './model/todo-model';
import TodoInput from './componants/TodoInput';
import {useState} from 'react';

function App() {
  const [todos, setTodos] = useState(MOCK_TODOS);
  function handleCreateTodo(todo) {
      setTodos(todos => [...todos, todo])
  }
  return (
    <div className="App-header">
      <h2>React TODOS Demo</h2>
      <TodoInput onCreateTodo = {handleCreateTodo} />
      <TodoList todos={todos} filter={ALL_STATUSES} />
    </div>
  );
}

export default App;
