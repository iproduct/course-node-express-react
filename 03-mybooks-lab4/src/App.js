import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import BookList from './BookList';
import mockBooks from './mock-books';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <h2 className="header center orange-text">My Library</h2>
          <div className="row center">
            <h5 className="header col s12 light">
              Bookmark your favourite books
            </h5>
          </div>
          <div className="row center">
            <a
              href="http://materializecss.com/getting-started.html"
              id="download-button"
              className="btn waves-effect waves-light orange"
            >
              View Favourites
            </a>
          </div>
          <BookList books={mockBooks} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
