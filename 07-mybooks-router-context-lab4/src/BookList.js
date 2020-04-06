import React from 'react';
import Book from './Book';

const BookList = ({ showFavs, books, favs, ...rest }) => {
  let booksToShow;
  let inFavs;
  if(showFavs) {
    booksToShow = favs;
    inFavs = (book) => true;
  } else {
    booksToShow = books;
    inFavs = (book) => favs.some(fav => fav.id === book.id);
  }
  
  return (
      <div className="section">
        <div className="row">
          {booksToShow.map(book => (
            <Book book={book} key={book.id} inFavs={inFavs(book)} {...rest}/>
          ))}
        </div>
      </div>
  );
};

export default BookList;
