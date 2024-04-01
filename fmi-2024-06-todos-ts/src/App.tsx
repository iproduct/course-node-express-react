import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo } from './todo-model';
import TODOS from './mock-todos';
import TodoList from './TodoList';

interface AppState {
  todos: Todo[];
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    todos: TODOS
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
