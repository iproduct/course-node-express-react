import React from 'react';
import TodoList from './todo-list';

export class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], todoText: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <h2>Things TODO</h2>
        <TodoList todos={this.state.todos} />
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Next task TODO ..."
              onChange={this.handleChange} value={this.state.todoText} />
            <span className="input-group-btn">
              <button className="btn btn-primary">Add TODO</button>
            </span>
          </div>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ todoText: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.todoText.trim();
    if (text.length > 0) {
      this.setState(prevState => ({
        todos: [ ...prevState.todos, {id: Date.now(), text, status: 'active'} ],
        todoText: ''
      }));
    }
  }
}
