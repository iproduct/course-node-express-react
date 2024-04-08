import React from 'react';
import './App.css';
import { Todo, TodoCreateDto } from './todo-model';
import TodoList from './TodoList';
import TodoRepository from './todo-repository';
import TodoInput from './TodoInput';

interface AppState {
  todos: Todo[];
  errors: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    todos: [],
    errors: ''
  }

  async componentDidMount() {
      const todos = await TodoRepository.findAll();
      this.setState({todos});
  }

  createTodo = async (todo: TodoCreateDto) => {
    const created = await TodoRepository.create(todo);
    this.setState(state => ({todos: [...state.todos, created]}))
  }

  showError = (error: Error) => {
    this.setState({errors: error.message})
  }


  render() {
    return (
      <div className='container d-flex flex-column justify-content-between text-black bg-light'>
        <TodoInput onCreateTodo={this.createTodo} onError={this.showError} />
        {this.state.errors && <div className='errors'>{this.state.errors}</div>}
        <hr />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
