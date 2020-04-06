import React from 'react';
import './Book.css';

export default function Book({ book, inFavs, addToFavs, removeFromFavs, ...rest }) {
  function onAddToFavs() {
    addToFavs && addToFavs(book);
  }
  function onRemoveFromFavs() {
    removeFromFavs && removeFromFavs(book);
  }

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
          {inFavs ? 
            <div className="card-action Book-card-action" onClick={onRemoveFromFavs}>
              Remove from Favs
            </div> : 
            <div className="card-action Book-card-action" onClick={onAddToFavs}>
              Add to Favs
            </div>}
         
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {book.title}
            <i className="material-icons right">close</i>
          </span>
          <p>{book.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

