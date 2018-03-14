import React from 'react';
import TodoList from './todo-list';

export class TodoApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { todos: [], todoText: '', filter: 'all' };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="col-lg-6">Things TODO 2</h2>
          <div className="col-lg-2">
            <select className="status-filter form-control col-lg-3" value={this.state.filter} onChange={this.handleFilterChange}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="conatiner col-lg-8">

            <TodoList todos={this.state.todos} filter={this.state.filter} onChangeStatus={this.handleStatusChange} />

            <form onSubmit={this.handleTodoSubmit}>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Next task TODO ..."
                  onChange={this.handleTextChange} value={this.state.todoText} />
                <span className="input-group-btn">
                  <button className='btn btn-primary'>Add TODO</button>
                </span>
              </div>
            </form>

            <div className="commands">
              <button className="btn btn-warning" onClick={() => this.handleTodosDelete('completed')}>Delete All Completed</button>
              <button className="btn btn-danger" onClick={() => this.handleTodosDelete('canceled')}>Delete All Canceled</button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  handleStatusChange = (id, newStatus) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo =>
        (todo.id === id) ? Object.assign({}, todo, { status: newStatus }) : todo
      );
      return { todos };
    });
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  handleTextChange = (e) => {
    this.setState({ todoText: e.target.value });
  }

  handleTodoSubmit = (e) => {
    e.preventDefault();
    this.state.todos.push(
      {
        id: Date.now(),
        text: this.state.todoText.trim(),
        status: 'active'
      });
  }
}

handleTodosDelete = (filter) => {
  this.setState(prevState => ({
    todos: prevState.todos.filter(todo => todo.status !== filter)
  }));
}

}