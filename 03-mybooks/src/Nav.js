import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <React.Fragment>
      <div className="navbar">
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container">
            <Link id="logo-container" to="/" className="brand-logo">
              <i className="large material-icons">menu_book</i>
            </Link>
            <Link to="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href="collapsible.html">Javascript</a>
              </li>
              <li>
                <a href="mobile.html">Mobile</a>
              </li>
              <li>
                <form>
                  <div className="input-field">
                    <input
                      type="search"
                      placeholder="search"
                      id="autocomplete-input"
                      className="Nav-search-input"
                    />
                    <i className="material-icons Nav-button">search</i>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">Javascript</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
    </React.Fragment>
  );
}
