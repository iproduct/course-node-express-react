import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';
import './app.css';
import { Route, Link , withRouter} from 'react-router-dom';
import Base from './base';
import Home from './components/home';
import About from './components/about';
import Repos from './components/repos';
import Topics from './components/Topics';
import ShowTheLocation from './components/show-location'
import { withParams } from './components/hocs';

@withRouter
class App extends Component {
  state = {
    topics: [
      {
        title:"React Intro", 
        content: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces."
      },
      {
        title:"Introducing JSX", 
        content: "JSX is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript."
      },
      {
        title:"Rendering Elements", 
        content: "Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements."
      },
      {
        title:"Components and Props", 
        content: "Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen."
      },
      {
        title:"State and Lifecycle", 
        content: "In this section, we will learn how to make the Clock component truly reusable and encapsulated. It will set up its own timer and update itself every second."
      },
    ]
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div className="container">
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
        <Route path="/" component={Base} />
        <Route path="/home" component={Home} />
        <Route path="/intro" render={() => <div>How to start using this app</div>} />
        <Route path="/repos" component={Repos} />
        <Route path="/topics" render={ withParams(Topics, { topics: this.state.topics }) } />
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
    console.log(path);
    console.log(this.context);
    // this.context.router.history.push(path);
    this.props.history.push(path);
  }

}

export default App;
