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
      this.setState({ todos });

    } catch (err) {
      this.showError(err as Error);
    }
  }

  createTodo = async (todo: TodoCreateDto) => {
    try {
      const created = await API.create(Todo, todo);
      this.setState(state => ({ todos: [...state.todos, created] }))
      this.clearErrors();
    } catch (err) {
      this.showError(err as Error);
    }
  }

  deleteTodo = async (todo: Todo) => {
    try {
      const deleted = await API.deleteById(Todo, todo.id);
      this.setState(state => ({ todos: state.todos.filter(td => td.id !== deleted.id) }))
      this.clearErrors();
    } catch (err) {
      this.showError(err as Error);
    }
  }

  showError = (error: Error) => {
    this.setState({ errors: error.message })
  }

  clearErrors = () => {
    this.setState({ errors: '' })
  }


  render() {
    return (
      <div className='container d-flex flex-column justify-content-between text-black bg-light'>
        <TodoInput onCreateTodo={this.createTodo} onError={this.showError} />
        {this.state.errors && <div className='errors'>Error: {this.state.errors}</div>}
        <hr />
        <TodoList todos={this.state.todos} onDelete={this.deleteTodo}/>
      </div>
    );
  }
}

export default App;
