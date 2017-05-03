import { connect } from 'react-redux';
import { changeStatus } from '../actions';
import TodoList from '../components/todo-list';

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

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
) (TodoList);

export default VisibleTodoList;