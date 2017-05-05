import React from 'react';
import { PropTypes } from 'prop-types';

class TodoDetails extends React.Component {
  static propTypes = {
    todo: PropTypes.object,
    onTodoEdited: PropTypes.func,
    onTodoCanceled: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { masterTodo: props.todo, editedTodo: { ...props.todo } };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ masterTodo: nextProps.todo, editedTodo: { ...nextProps.todo } } );
  }

  render() {
    return (
    <form className="form-horizontal" onSubmit={this.handleSubmit}>
      <hr />
      <div className="form-group">
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" className="form-control" readOnly={true}
          value={this.state.editedTodo.id} />
      </div>

      <div className="form-group">
        <label htmlFor="text">Text: </label>
        <input type="text" id="text" className="form-control" placeholder="Next task TODO ..."
          onChange={this.handleTextChange} value={this.state.editedTodo.text} />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status: </label>
        <input type="text" id="status" className="form-control" placeholder="Todo status ..."
          onChange={this.handleStatusChange} value={this.state.editedTodo.status} />
      </div>

     <div className="form-group">
        <span className="input-group-btn">
          <button className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-default"  onClick={this.handleCancel}>Cancel</button>
        </span>
      </div>
    </form>);
  }

  handleTextChange = (e) => 
  {
    const value = e.target.value;
    this.setState(prevState => {
      prevState.editedTodo.text = value;
      return { editedTodo: prevState.editedTodo };
    });
  }

  handleStatusChange = (e) => 
  {
    const value = e.target.value;
    this.setState(prevState => {
      prevState.editedTodo.status = value;
      return { editedTodo: prevState.editedTodo };
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(prevState => (
      { masterTodo: { ...prevState.editedTodo } }
    ));
    this.props.onTodoEdited(this.state.editedTodo);
  }

  handleCancel = (e) => {
    e.preventDefault();
    // this.setState(prevState => (
    //   { editedTodo: { ...prevState.masterTodo } }
    // ));
    this.props.onTodoCanceled();
  }
}

export default TodoDetails;
