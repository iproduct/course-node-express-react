import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';
import './app.css';
import { Route, Link , withRouter} from 'react-router-dom';
import Base from './base';
import Home from './components/home';
import About from './components/about';
import Repos from './components/repos';
import Topics from './components/topics';
import ShowTheLocation from './components/show-location'

@withRouter
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
        <Route path="/" component={Base} />
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
    console.log(path);
    console.log(this.context);
    // this.context.router.history.push(path);
    this.props.history.push(path);
  }

}

export default App;
