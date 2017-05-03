import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route, hashHistory, Link } from 'react-router-dom';
import About from './components/about';
import Repos from './components/repos';
import Topics from './components/topics';
import ShowTheLocation from './components/show-location'

ReactDOM.render(
  <Router history={hashHistory}>
    <div>
      <ul className="main-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/intro">Intro</Link></li>
        <li><Link to="/repos">Repos</Link></li>
        <li><Link to="/topics">Topics</Link></li>        
        <li><Link to="/show-location">Show the Location</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <hr />
      <Route path="/" component={App} />
      <Route path="/intro" render={() => <div>How to start using this app</div>} />
      <Route path="/repos" component={Repos} />
      <Route path="/topics" component={Topics} />
      <Route path="/about" component={About} />
      <Route path="/show-location" component={ShowTheLocation} />      
    </div>
  </Router>,
  document.getElementById('root')
);
