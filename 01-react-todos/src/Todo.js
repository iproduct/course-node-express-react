import React from 'react';

export default ({ todo, onChangeStatus }) => (
  <div key={todo.id} className='d-flex flex-row justify-content-between text-black bg-light'>
    <span className="todo-text">{todo.text}</span>
    <span>
      <span className={`label text-${todo.status === 'active' ? 'info' : todo.status === 'completed' ? 'success' : 'danger'}`}>
        {todo.status === 'active' ? '' : todo.status === 'completed' ? 'Completed' : 'Canceled'}
      </span>
      {todo.status === 'active' &&     // show only when todo is active
        <button title="Task Canceled" className="btn btn-sm btn-danger pull-right"
          onClick={() => onChangeStatus(todo.id, 'canceled')}>
          <i className="bi bi-x"></i>
        </button>
      }
      {todo.status === 'active' &&     // show only when todo is active
        <button title="Task Completed" className="btn btn-sm btn-success pull-right" onClick={() => onChangeStatus(todo.id, 'completed')}>
          <i className="bi bi-check-lg"></i>
        </button>
      }
    </span>
  </div>);
