import React from 'react';
import Todo from './todo';
import TodoDetails from './todo-details';
import { CSSTransitionGroup } from 'react-transition-group';
import AnimationOnPropsChange from './animation-on-props-change';

import { connect } from 'react-redux';
import { changeStatus, selectTodo, editTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
  const filteredTodos = todos.filter(todo => filter === 'all' ? true : todo.status === filter);
  console.log(filteredTodos);
  return filteredTodos;
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  selectedTodo: state.selectedTodo
});

const mapDispatchToProps = (dispatch) => ({
  onTodoEdited: (todo) => {
    dispatch(editTodo(todo));
    dispatch(selectTodo(null));
  },
  onTodoCanceled: () => {
    dispatch(selectTodo(null));
  },
  onTodoSelected: (todo) => {
    dispatch(selectTodo(todo));
  },
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
  constructor(props) {
    super(props);
    this.prevSelectedTodo = null;
  }

componentWillReceiveProps(nextProps) {
    if (this.props.selectedTodo !== nextProps.selectedTodo) {
      this.prevSelectedTodo = this.props.selectedTodo;
    }
  }

  render() {
    let { selectedTodo, todos, ...rest } = this.props;
    return (
      <div>
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
        <AnimationOnPropsChange shouldFadeOut={this.prevSelectedTodo !== null} shouldFadeIn={selectedTodo !== null} todo={selectedTodo} {...rest}>
          <TodoDetails />
        </AnimationOnPropsChange>
      </div>
    );
  }
}
