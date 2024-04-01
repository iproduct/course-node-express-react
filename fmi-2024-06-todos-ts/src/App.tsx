import React from 'react';
import './App.css';
import { Todo } from './todo-model';
import TodoList from './TodoList';
import TodoRepository from './todo-repository';

interface AppState {
  todos: Todo[];
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    todos: []
  }

  async componentDidMount() {
      const todos = await TodoRepository.findAll();
      this.setState({todos});
  }

  render() {
    return (
      <div className='container d-flex flex-column justify-content-between text-black bg-light'>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
