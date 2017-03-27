import React from 'react';
import TodoList from './todo-list';
import TodoForm from './todo-form';

export class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  render() {
    return (
      <div className="container">
        <h2>Things TODO</h2>
        <TodoList todos={this.state.todos} />
        <TodoForm onSubmit={this.handleSubmitTodo} />
      </div>
    );
  }

  handleSubmitTodo = (text) => {
    text = text.trim();
    if (text.length > 0) {
      this.setState(prevState => ({
        todos: [...prevState.todos, { id: Date.now(), text, status: 'active' }]
      }));
      return true;
    }
    return false;
  }
}
