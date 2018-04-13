import React from 'react';
import { getMarkdown } from './helper';

const TodoItem = ({ todo, index, onStateChange }) => (
  <li key={todo.id}>
    <span className="id">{index}. </span>
    <span dangerouslySetInnerHTML={ getMarkdown(todo.title) }></span> - {todo.status.toUpperCase()}
    <button
      title="Cancel task"
      className="btn btn-sm btn-danger pull-right"
      onClick={() => onStateChange(todo.id, 'canceled')}
    >
      <span className="glyphicon glyphicon-remove" />
    </button>
    <button
      title="Complete task"
      className="btn btn-sm btn-success pull-right"
      onClick={() => onStateChange(todo.id, 'completed')}
    >
      <span className="glyphicon glyphicon-ok" />
    </button>
  </li>
);

export default TodoItem;
