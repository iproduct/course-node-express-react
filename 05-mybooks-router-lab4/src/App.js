import React, { useState } from 'react';
import './App.css';
import Nav from './Nav';
import BookList from './BookList';
import mockBooks from './mock-books';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const GOOLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';

function App() {
  const [books, setBooks] = useState(mockBooks);
  const [favs, setFavs] = useState([]);
  return (
    <Router>
      <Nav searchBooks={onSearchBooks} />
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <Switch>
            <Route path="/about">
              <Header titleText="Bookmark your favourite books to read them later." buttonText="Get Started" buttonLink="/" />
              <div className="row center">
                <img src="/img/reading.png" alt="book reading" className="App-about"/>
              </div>   
            </Route>
            <Route path="/users">Users</Route>
            <Route path="/favs">
              <Header titleText="Your favourite books" buttonText="View All Books" buttonLink="/" />
              <BookList showFavs={true} books={books} favs={favs} addToFavs={onAddtoFavs} removeFromFavs={onRemoveFromFavs} />
            </Route>
            <Route path="/">
              <Header titleText="Bookmark your favourite books" buttonText="View Favourites" buttonLink="/favs"/>
              <BookList showFavs={false} books={books} favs={favs} addToFavs={onAddtoFavs} removeFromFavs={onRemoveFromFavs} />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );

  async function onSearchBooks(searchText) {
    const booksResp = await fetch(
      GOOLE_BOOKS_API_BASE + encodeURIComponent(searchText)
    );
    const booksFound = await booksResp.json();
    console.log(booksFound.items);
    setBooks(
      booksFound.items.map(gbook => ({
        id: gbook.id,
        title: gbook.volumeInfo.title,
        subtitle: gbook.volumeInfo.subtitle,
        frontPage:
          gbook.volumeInfo.imageLinks && gbook.volumeInfo.imageLinks.thumbnail
      }))
    );
  }

  function onAddtoFavs(book) {
    setFavs([...favs, book]);
  }
  function onRemoveFromFavs(book) {
    setFavs(favs.filter(fav => fav.id !== book.id));
  }
}

export default App;
