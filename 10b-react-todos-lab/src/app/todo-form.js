import React from 'react';

class TodoForm extends React.Component {
  static propTypes = {onSubmit : React.PropTypes.func.isRequired};

  constructor(props) {
    super(props);
    this.state = { todoText: '' };
  }

  render() {
    return (<form className="row" onSubmit={this.handleSubmit}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Next task TODO ..."
          onChange={this.handleChange} value={this.state.todoText} />
        <span className="input-group-btn">
          <button className="btn btn-primary">Add TODO</button>
        </span>
      </div>
    </form>);
  }

  handleChange = (e) => {
    this.setState({ todoText: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(
      prevState => ({ todoText: this.props.onSubmit(this.state.todoText) ? '' : prevState.todoText })
    );
  }
}

export default TodoForm;
