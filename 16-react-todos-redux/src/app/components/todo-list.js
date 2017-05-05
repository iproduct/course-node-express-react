import React from 'react';
import Todo from './todo';
import { CSSTransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { changeStatus } from '../actions';

const TodoList = ({ todos, ...rest }) => (
  <ul className="todo-list list-group">
    <CSSTransitionGroup transitionName="todos" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
      {todos.map(todo => (
        <li key={todo.id} className="list-group-item">
          <Todo todo={todo} {...rest} />
        </li>
      ))
      }
    </CSSTransitionGroup>
  </ul>
);

export default TodoList;