import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CommentBox from './comment-box';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CommentBox url="/api/articles" pollInterval={50000} />,
      </div>
    );
  }
}

export default App;
