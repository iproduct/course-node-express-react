import React, { useState } from 'react';
import Nav from './Nav';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  async function findBooks(searchStr) {
    const booksResp = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=' + searchStr
    );
    const books = await booksResp.json();
    console.log(books);
    setBooks(books);
  }
  return (
    <React.Fragment>
      <Nav onFindBooks={findBooks} />
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <h1 className="header center orange-text">Bookstore</h1>
          <div className="row center">
            <h5 className="header col s12 light">
              Read more for profit and fun: React + Materialize demo
            </h5>
          </div>
          <div className="row center">
            <a
              href="favs"
              id="action-button"
              className="btn-large waves-effect waves-light orange"
            >
              Go to Favourites
            </a>
          </div>
          <br />
        </div>
      </div>
      <div className="container">
        <div className="section">
          <h5>Books List ({'len .Db'} books)</h5>
          <div className="row">
            {
              // $fav := .Fav}} // range .Db}}
            }
            <div className="card-wrapper col s12 l6">
              <div className="card horizontal sticky-action">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator"
                    alt="thumbnail"
                    src="{'urlSafe .Thumbnail'}"
                  />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                      {'Title'}
                      <i className="material-icons right">more_vert</i>
                    </span>
                    <p>
                      <a href="#">{'Subtitle'}</a>
                    </p>
                    <div className="card-action">
                      {
                        // if (index $fav .ID).ID}}
                        //     <a href="books?remove={{.ID}}">Remove from Favourites</a>
                        // else}}
                        //     <a href="books?add={{.ID}}">Add to Favourites</a>
                        // end}}
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              // end }}
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
