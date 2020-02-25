import React from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 1, text: "Learn React.js", status: 'active'},
        {id: 2, text: "Learn JSX syntax", status: 'active'},
        {id: 3, text: "Learn Redux", status: 'active'},
        {id: 4, text: "Learn Mobx", status: 'active'},
        {id: 5, text: "Learn Node.js", status: 'active'},
        {id: 6, text: "Learn Express", status: 'active'},
        {id: 7, text: "Experiment with MongoDB", status: 'active'},
      ]
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Todo Demo</h2>
        <TodoInput onNewTodo={this.addTodo}/>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }

  addTodo = (todo) => {
    this.setState(prevState => ({todos: [...prevState.todos, todo]}));
  }
}

export default App;
