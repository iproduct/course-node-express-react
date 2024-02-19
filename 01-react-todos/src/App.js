import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

class App extends Component {
  
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
        <TodoInput onCreateTodo={this.handleTodoSubmit} onError={()=>{}} />
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

  handleTodoSubmit(todo) {
    this.setState(prevState => ({
      todoText: '',
      todos: [
        ...prevState.todos,
        todo
      ]
    }))
  }
}

export default App;
