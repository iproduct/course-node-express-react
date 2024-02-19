import './App.css';
import TODOS from './mock-todos';

function AppTodos() {
  return (
    <div className='container d-flex flex-column justify-content-between text-black bg-light'>
      {TODOS.map(todo =>
      (<div key={todo.id} className="card my-1 ">
        <div className="card-body">
          <span>{todo.id}</span>
          <span>{todo.text}</span>
          <span>{todo.status}</span>
        </div>
      </div>)
      )}
    </div>
  );
}

export default AppTodos;
