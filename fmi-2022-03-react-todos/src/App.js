import { useState } from 'react';
import './App.css';
import TodoFilter from './components/TodoFilter';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import MOCK_TODOS from './model/mock-todos';
import { ALL_STATUSES } from './model/todo-model';

function App() {
  const [todos, setTodos] = useState(MOCK_TODOS)
  const [filter, setFilter] = useState(ALL_STATUSES);
  function deleteTodo(deleted) {
    setTodos(oldTodos => oldTodos.filter(td => td.id !== deleted.id));
  }
  function statusChanged(changedTodo) {
    setTodos(oldTodos => oldTodos.map(td => td.id === changedTodo.id? changedTodo : td))
  }
  function filterChanged(filter){
    setFilter(filter)
  }
  return (
    <div className="App-header">
      <h1>React TODOs Demo</h1>
      <TodoInput onSubmitTodo={todo => setTodos(oldTodos => [...oldTodos, todo])} />
      <TodoFilter onFilterChange={filterChanged} />
      <TodoList todos={todos} filter={filter} onDelete={deleteTodo} onStatusChange={statusChanged}/>
    </div>
  );
}

export default App;
