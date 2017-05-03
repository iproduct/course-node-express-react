import React from 'react';
import TodoList from './todo-list';
import TodoForm from './todo-form';
import FilterChooser from './filter-chooser';
import CommandToolbar from './command-toolbar';
import { connect } from 'react-redux';
import { setVisibilityFilter, deleteTodos  } from '../actions';

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

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class TodoApp extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="col-lg-6">Things TODO Redux</h2>
          <div className="col-lg-2">
            <FilterChooser {...this.props} />
          </div>
        </div>
        <div className="row">
          <div className="conatiner col-lg-8">
            <TodoList />
            <TodoForm />
            <CommandToolbar {...this.props} />
          </div>
        </div>
      </div>
    );
  }

}

export default TodoApp;