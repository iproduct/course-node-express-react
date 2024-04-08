import React from 'react';
import './App.css';
import { Todo, TodoCreateDto } from './todo-model';
import TodoList from './TodoList';
import TodoRepository from './todo-repository';
import TodoInput from './TodoInput';
import API from './todo-api-client';

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
    try {
      const todos = await API.findAll(Todo);
      this.setState({todos});
      this.clearErrors();
    } catch(err) {
      this.showError(err as Error);
    }
  }

  createTodo = async (todo: TodoCreateDto) => {
    const created = await TodoRepository.create(todo);
    this.setState(state => ({todos: [...state.todos, created]}))
  }

  showError = (error: Error) => {
    this.setState({errors: error.message})
  }

  clearErrors = () => {
    this.setState({errors: ''})
  }


  render() {
    return (
      <div className='container d-flex flex-column justify-content-between text-black bg-light'>
        <TodoInput onCreateTodo={this.createTodo} onError={this.showError} />
        {this.state.errors && <div className='errors'>Error: {this.state.errors}</div>}
        <hr />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
