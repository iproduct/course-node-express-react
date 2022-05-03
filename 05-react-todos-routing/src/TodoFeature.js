import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';

class TodoFeature extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 1, text: 'Learn ECMAScript', status:'active'},
        {id: 2, text: 'Learn React', status:'active'},
        {id: 3, text: 'Learn JSX', status:'active'},
        {id: 4, text: 'Learn Redux', status:'active'},
      ], 
      todoText: '', 
      filter: 'all'
    };
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
  }

  render() {
    return (
      <div className="container col-sm-8">
        <h2>React Todo Demo</h2>
        <form onSubmit={this.handleTodoSubmit}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Next task todo ..."
              onChange={this.handleTextChange} 
              value={this.state.todoText} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">Add Todo</button>
              </span>
          </div>
        </form>
        <TodoList todos={this.state.todos} onChangeStatus={this.handleStatusChange} /> 
      </div>
    );
  }


  handleTextChange = (e) => {
    this.setState({todoText: e.target.value});
  }

  handleStatusChange = (todoId, status) => {
    this.setState(prevState =>
      ({
        todos: prevState.todos.map(todo => (todo.id === todoId ? {...todo, status }: todo)) 
      })
    );
  }

  handleTodoSubmit(e) {
    e.preventDefault();
    this.setState(prevState => ({
      todoText: '',
      todos: [
        ...prevState.todos,
        {id: Date.now(), text: prevState.todoText.trim(), status: 'active'}
      ]
    }))
  }
}

export default TodoFeature;
