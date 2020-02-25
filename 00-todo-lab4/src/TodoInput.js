import React from 'react';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: ''
    };
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleTodoSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What to do?"
            onChange={this.handleTextChanged}
            value={this.state.todoText}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">
              Add Todo
            </button>
          </span>
        </div>
      </form>
    );
  }

  handleTodoSubmit(event) {
    event.preventDefault();
    this.props.onNewTodo({
      id: Date.now(),
      text: this.state.todoText,
      status: 'active'
    });
    this.setState({todoText: ''})
  }

  handleTextChanged = event => {
    this.setState({ todoText: event.target.value });
  };
}

export default TodoInput;
