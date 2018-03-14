import React from 'react';

export default ({todo, onChangeStatus}) => (
  <div key={todo.id}>
    <span className={`label label-${todo.status === 'active' ? 'info' : todo.status === 'completed' ? 'success' : 'danger'} pull-right`}>
      {todo.status === 'active' ? '' : todo.status === 'completed' ? 'Completed' : 'Canceled'}
    </span>
    <span className="todo-text">{todo.text}</span>
    { todo.status === 'active' &&     // show only when todo is active
      <button title="Task Canceled" className="btn btn-sm btn-danger pull-right" 
          onClick={() => onChangeStatus(todo.id, 'canceled')}>
        <span className="glyphicon glyphicon-remove"></span>
      </button>
    }
    { todo.status === 'active' &&     // show only when todo is active
      <button title="Task Completed" className="btn btn-sm btn-success pull-right" onClick={() => onChangeStatus(todo.id, 'completed')}>
        <span className="glyphicon glyphicon-ok"></span>
      </button>
    }
  </div>);
