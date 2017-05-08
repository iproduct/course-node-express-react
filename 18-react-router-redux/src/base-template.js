import React, { Component } from 'react';
import logo from './logo.svg';
import './base-template.css';
import { connect } from 'react-redux';

@connect()
class BaseTemplate extends Component {
  render() {
    return (
      <div className="base">
        <div className="base-header">
          <img src={logo} className="base-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="base-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default BaseTemplate;
