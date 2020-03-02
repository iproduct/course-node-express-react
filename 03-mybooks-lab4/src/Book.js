import React from 'react';
import './Book.css'

export default function Book({ book, ...rest }) {
  return (
    <div className="card-wrapper col s12 l6 Book-card">
      <div className="card horizontal sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator Book-front-image" src={book.frontPage} alt="front page" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {book.title}: {book.subtitle}
            <i className="material-icons right">more_vert</i>
          </span>
          <p>
            <a href="#">This is a link</a>
          </p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {book.title}: {book.subtitle}
            <i className="material-icons right">close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div>
      </div>
    </div>
  );
}
