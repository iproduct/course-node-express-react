import React from 'react';
import Todo from './todo';
import { CSSTransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { changeStatus } from '../actions';

const getVisibleTodos = (todos, filter) => {
  const filteredTodos = todos.filter(todo => filter === 'all' ? true : todo.status === filter);
  console.log(filteredTodos);
  return filteredTodos;
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch) => ({
  onCompleted: (id) => {
    dispatch(changeStatus(id, 'completed'));
  },
  onCanceled: (id) => {
    dispatch(changeStatus(id, 'canceled'));
  }
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class TodoList extends React.Component {
  render() {
    let { todos, ...rest } = this.props;
    return (
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
  }
}
