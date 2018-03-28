import React from 'react';
import TodoList from './todo-list';

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, title: 'Todo 1', status: 'active' },
        { id: 2, title: 'Todo 2', status: 'active' },
        { id: 3, title: 'Todo 3', status: 'active' },
        { id: 4, title: 'Todo 4', status: 'active' },
        { id: 5, title: 'Todo 5', status: 'active' },
        { id: 6, title: 'Todo 6', status: 'active' }
      ],
      todoText: ''
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>React TODOs App</h1>
          <div className="col-lg-2">
            <select
              className="status-filter form-control col-lg-3"
              value={this.state.filter}
              onChange={this.handleFilterChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <TodoList todos={this.state.todos} />
        <div className="row">
          <div className="conatiner col-lg-8">
            <form onSubmit={this.handleTodoSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Next task TODO ..."
                  onChange={this.handleTextChange}
                  value={this.state.todoText}
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary">Add TODO</button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleTodoSubmit = e => {
    e.preventDefault();
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: Date.now(),
          title: this.state.todoText.trim(),
          status: 'active'
        }
      ]
    });
  };

  handleTextChange = e => {
    this.setState({ todoText: e.target.value });
  };
}
