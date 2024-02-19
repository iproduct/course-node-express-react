import './App.css';
import { TodoList } from './TodoList';
import TODOS from './mock-todos';

function AppTodos() {
  return (
    <div className='container d-flex flex-column justify-content-between text-black bg-light'>
      <TodoList todos={TODOS} />
    </div>
  );
}

export default AppTodos;
