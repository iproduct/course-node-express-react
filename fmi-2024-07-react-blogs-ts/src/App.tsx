import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="#">Navbar Link</a></li>
          </ul>

          <ul id="nav-mobile" className="sidenav">
            <li><a href="#">Navbar Link</a></li>
          </ul>
          <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
      </nav>
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br /><br />
          <h1 className="header center orange-text">My Blogs</h1>
          <div className="row center">
            <h5 className="header col s12 light">React Demo using TypeScript and React Router</h5>
          </div>
          <div className="row center">
            <button id="download-button" className="btn-large btn-large waves-effect waves-light orange"
              onClick={() => {}}>
              Add New Post
            </button>
          </div>
          <br /><br />
        </div>
      </div>

      <div className="container">

        <div className="section">
          <div className="row">
            <p>Blog posts here</p>
          </div>
        </div>
        <br /><br />
      </div>


      <footer className="page-footer orange">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Company Bio</h5>
              <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>


            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Settings</h5>
              <ul>
                <li><a className="white-text" href="#!">Link 1</a></li>
                <li><a className="white-text" href="#!">Link 2</a></li>
                <li><a className="white-text" href="#!">Link 3</a></li>
                <li><a className="white-text" href="#!">Link 4</a></li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Connect</h5>
              <ul>
                <li><a className="white-text" href="#!">Link 1</a></li>
                <li><a className="white-text" href="#!">Link 2</a></li>
                <li><a className="white-text" href="#!">Link 3</a></li>
                <li><a className="white-text" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Made by <a className="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
