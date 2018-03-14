import React from 'react';
import Todo from './todo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default ({ todos, filter, ...rest }) => (
  <ul className="todo-list list-group">
    <ReactCSSTransitionGroup transitionName="todos" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
      {todos
        .filter(todo => filter === 'all' ? true : todo.status === filter)
        .map(todo => (
          <li key={todo.id} className="list-group-item">
            <Todo todo={todo} {...rest} />
          </li>
        ))
      }
    </ReactCSSTransitionGroup>
  </ul>
);
