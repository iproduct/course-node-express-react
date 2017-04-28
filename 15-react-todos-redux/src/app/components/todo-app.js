import React from 'react';
import VisibleTodoList from '../containers/visible-todo-list';
import DispatchableTodoForm from '../containers/dispatchable-todo-form';
import FilterChooser from './filter-chooser';
import CommandToolbar from './command-toolbar';

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
            <VisibleTodoList />
            <DispatchableTodoForm />
            <CommandToolbar {...this.props} />
          </div>
        </div>
      </div>
    );
  }

}

export default TodoApp;