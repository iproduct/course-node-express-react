import React from 'react';

const BookList = ({ books, ...rest }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id} className="book-card">
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
          <img src={book.frontPage} alt={book.subtitle}/>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
