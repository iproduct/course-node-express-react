import React from 'react';

export class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos:[], todoText:''};
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <h2>Things TODO</h2>
        {this.state.todoText}
        <form className="row">
          <input type="text" className="form-control" placeholder="Next task TODO ..."
           onChange={this.handleChange} />
        </form>
      </div>
    );
  }

  handleChange( e ) {
    this.setState({todoText: e.target.value});
  }
}
