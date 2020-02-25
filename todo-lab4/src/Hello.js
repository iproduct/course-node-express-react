import React from 'react';
import './App.css';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello {this.props.name}, from React App!</h2>
      </div>
    );
  }
  
}

export default Hello;
