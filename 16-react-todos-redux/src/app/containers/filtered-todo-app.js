import { connect } from 'react-redux';
import { setVisibilityFilter, deleteTodos  } from '../actions';
import TodoApp from '../components/todo-app';

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
  setVisibilityFilter: (newFilter) => {
    dispatch(setVisibilityFilter(newFilter));
  },
  deleteAllCompleted: () => {
    dispatch(deleteTodos('completed'));
  },
  deleteAllCanceled: () => {
    dispatch(deleteTodos('canceled'));
  }
});

export const FilteredTodoApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);
