import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav({ searchBooks, ...rest }) {
  const [searchText, setSearchText] = useState('');
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
                <Link to="/favs">Favourites</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              
              <li>
                <form>
                  <div className="input-field">
                    <input
                      type="search"
                      placeholder="search"
                      id="autocomplete-input"
                      className="Nav-search-input"
                      onChange={handleTextChanged}
                      value={searchText}
                    />
                    <i
                      className="material-icons Nav-button"
                      onClick={submitSearch}
                    >
                      search
                    </i>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favs">Favourites</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        
        <li>
          <form>
            <div className="input-field">
              <input
                type="search"
                placeholder="search"
                id="autocomplete-input"
                className="Nav-search-input"
                onChange={handleTextChanged}
                value={searchText}
              />
              <i
                className="material-icons Nav-button"
                onClick={submitSearch}
              >
                search
              </i>
            </div>
          </form>
        </li>
      </ul>
    </React.Fragment>
  );

  function handleTextChanged(event) {
    setSearchText(event.target.value);
  }

  function submitSearch(event) {
    const search = searchText.trim();
    if (search) {
      searchBooks(search);
      setSearchText('');
    }
  }
}
