import './App.css';
import TODOS from './mock-todos';

function AppTodos() {
  return (
    <div className='container d-flex flex-column justify-content-between text-black bg-light'>
      {TODOS.map(todo =>
      ()
      )}
    </div>
  );
}

export default AppTodos;
