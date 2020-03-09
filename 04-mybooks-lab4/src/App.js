import React, { useState } from 'react';
import './App.css';
import Nav from './Nav';
import BookList from './BookList';
import mockBooks from './mock-books';
import Header from './Header';
import Footer from './Footer';

const GOOLE_BOOKS_API_BASE = "https://www.googleapis.com/books/v1/volumes?q=";

function App() {
  const [books, setBooks] = useState(mockBooks);
  return (
    <React.Fragment>
    <Nav searchBooks={onSearchBooks} />
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
      <Header />
      <BookList books={books} />
      </div>
    </div>
    <Footer />
    </React.Fragment>
  );

  async function onSearchBooks(searchText) {
    const booksResp = await fetch(GOOLE_BOOKS_API_BASE + encodeURIComponent(searchText));
    const booksFound = await booksResp.json();
    console.log(booksFound.items);
    setBooks(booksFound.items.map(gbook => ({
      'id': gbook.id,
      'title': gbook.volumeInfo.title,
      'subtitle': gbook.volumeInfo.subtitle,
      'frontPage': gbook.volumeInfo.imageLinks && gbook.volumeInfo.imageLinks.thumbnail
    })));
  }
}

export default App;
