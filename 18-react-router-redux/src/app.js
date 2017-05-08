import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';
import './app.css';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import BaseTemplate from './base-template';
import Home from './components/home';
import About from './components/about';
import Repos from './components/repos';
import Topics from './components/topics';
import ShowTheLocation from './components/show-location'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {withRouter} from 'react-router';

@withRouter
@connect()
class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div>
        <ul className="main-menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/intro">Intro</Link></li>
          <li><Link to="/repos">Repos</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/show-location">Show the Location</Link></li>
          <li><Link to="/about">About</Link></li>
          <form className="navbar-form navbar-right" role="search" onSubmit={this.handleSerch}>
            <input type="text" placeholder="userName" className="form-control" /> / {' '}
            <input type="text" placeholder="repo" className="form-control" />{' '}
            <button type="submit" className="btn btn-default">Go</button>
          </form>
        </ul>
        <hr />
        <Route path="/" component={BaseTemplate} />
        <Route path="/home" component={Home} />
        <Route path="/intro" render={() => <div>How to start using this app</div>} />
        <Route path="/repos" component={Repos} />
        <Route path="/topics" component={Topics} />
        <Route path="/about" component={About} />
        <Route path="/show-location" component={ShowTheLocation} />
      </div>
    );
  }

  handleSerch = (event) => {
    event.preventDefault();
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/repos/${userName}/${repo}`;
    // this.context.router.history.push(path);
    // Now you can dispatch navigation actions from anywhere!
    this.props.dispatch(push(path)); 
  }

}

export default App;
