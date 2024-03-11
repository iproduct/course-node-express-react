import { Component } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import TODOS from './mock-todos';

class AppTodos extends Component {
  state = {
    todos: TODOS,
    error: undefined
  }

  // constructor(props) {
  //   super(props);
  //   this.removeTodo = this.removeTodo.bind(this)
  // }

  removeTodo = todo => {
    console.log('Deleting', todo);
    this.setState(state => ({ todos: this.state.todos.filter(td => td.id !== todo.id) }));
  }

  render() {
    return (
      <div className='container d-flex flex-column justify-content-between text-black bg-light'>
        <TodoList todos={this.state.todos} onDelete={this.removeTodo} />
      </div>
    );
  }
}

export default AppTodos;
