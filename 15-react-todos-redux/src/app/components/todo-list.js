import React from 'react';
import Todo from './todo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TodoList = ({ todos, ...rest }) => (
  <ul className="todo-list list-group">
    <ReactCSSTransitionGroup transitionName="todos" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
      {todos.map( todo => (
          <li key={todo.id} className="list-group-item">
            <Todo todo={todo} {...rest} />
          </li>
        ))
      }
    </ReactCSSTransitionGroup>
  </ul>
);

export default TodoList;