import React from 'react';
import Todo from './todo';
import { ReactTransitionGroup } from 'react-transition-group';

const TodoList = ({ todos, filter, ...rest }) => (
  <ul className="todo-list list-group">
    
      {todos
        .filter(todo => filter === 'all' ? true : todo.status === filter)
        .map(todo => (
          <li key={todo.id} className="list-group-item">
            <Todo todo={todo} {...rest} />
          </li>
        ))
      }

  </ul>
);

export default TodoList;