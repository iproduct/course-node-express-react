import React from 'react';
import Book from './Book';

const BookList = ({ books, ...rest }) => {
  return (
      <div className="section">
        <div className="row">
          {books.map(book => (
            <Book book={book} key={book.id} {...rest}/>
          ))}
        </div>
      </div>
  );
};

export default BookList;
