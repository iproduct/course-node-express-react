import React from 'react';
import './Book.css';

export default function Book({ book, ...rest }) {
  return (
    <div className="card-wrapper col s12 l6 Book-card">
      <div className="card horizontal">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator Book-front-image"
            src={book.frontPage}
            alt="front page"
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {book.title}
            <i className="material-icons right">more_vert</i>
          </span>
          <p>{book.subtitle}</p>
          <div className="card-action Book-card-action">
            {
              // if (index $fav .ID).ID}}
              <a href="books?remove={{.ID}}">Remove Fav</a>
              // else}}
              //     <a href="books?add={{.ID}}">Add to Favourites</a>
              // end}}
            }
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {book.title}<i className="material-icons right">close</i>
          </span>
          <p>{book.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
