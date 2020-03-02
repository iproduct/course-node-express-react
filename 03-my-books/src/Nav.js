import React from 'react';
export default function Nav(props) {
  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="books" className="brand-logo">
          <i className="large material-icons">menu_book</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="favs">Favourites</a>
          </li>
          <li>
            <div className="center row">
              <div className="col s12 ">
                <div className="row" id="topbarsearch">
                  <div className="input-field col s6 s12 red-text">
                    <i className="red-text material-icons prefix">search</i>
                    <input
                      type="text"
                      placeholder="search"
                      id="autocomplete-input"
                      class="autocomplete red-text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li>
            <a href="favs">Favourites</a>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  );
}
