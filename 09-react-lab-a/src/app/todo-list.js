import React from 'react';
import TodoItem from './todo-item';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default ({ todos, filter, ...props }) => (
  <ul className="todo-list">
    <TransitionGroup>
      {todos
        .filter(todo => filter === 'all' || todo.status === filter)
        .map((todo, index) => (
          <CSSTransition key={todo.id} timeout={1000} classNames="todos">
            <TodoItem todo={todo} index={index} {...props} />
          </CSSTransition>
        ))}
    </TransitionGroup>
  </ul>
);
