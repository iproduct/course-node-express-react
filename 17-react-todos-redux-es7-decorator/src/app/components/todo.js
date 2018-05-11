import React from 'react';

const Todo = ({ todo, onTodoSelected, onCompleted, onCanceled, onDelete }) => (
  <div key={todo.id} onClick={() => onTodoSelected(todo)} >
    <span className={`label label-${todo.status === 'active' ? 'info' : todo.status === 'completed' ? 'success' : 'danger'} pull-right`}>
      {todo.status === 'active' ? '' : todo.status === 'completed' ? 'Completed' : 'Canceled'}
    </span>
    <span className="todo-text">{todo.text}</span>
    {todo.status === 'active' &&     // show only when todo is active
      <button title="Task Canceled" className="btn btn-sm btn-danger pull-right"
        onClick={(e) => {e.stopPropagation(); onCanceled(todo.id);}}>
        <span className="glyphicon glyphicon-ban-circle"></span>
      </button>
    }
    {todo.status === 'active' &&     // show only when todo is active
      <button title="Task Completed" className="btn btn-sm btn-success pull-right" onClick={(e) => {e.stopPropagation(); onCompleted(todo.id);}}>
        <span className="glyphicon glyphicon-ok"></span>
      </button>
    }
    <button title="Delete todo" className="btn btn-sm btn-danger pull-right"
      onClick={(e) => {e.stopPropagation(); onDelete(todo.id);}}>
      <span className="glyphicon glyphicon-remove"></span>
    </button>
  </div>);

export default Todo;