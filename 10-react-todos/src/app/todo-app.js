import React from 'react';
import TodoList from './todo-list';

export class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { todos: [], newTodo: '' };
  }

  render() {
    return (
      <div className="container">
        <h2>Things TODO</h2>
        <TodoList todos={this.state.todos} />
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="input-group col-lg-6">
            <input type="text" className="form-control" placeholder="Next task TODO ..."
              onChange={this.handleChange} value={this.state.newTodo} />
            <span className="input-group-btn">
              <button className='btn btn-secondary' >Add TODO</button>
            </span>
          </div>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(prevState => ({
      todos: [
        ...prevState.todos, {
          id: Date.now(),
          text: prevState.newTodo.trim()
        }
      ],
      newTodo: ''
    }));
  }

}