import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import BookList from './BookList'
import mockBooks from './mock-books'

function App() {
  return (
    <React.Fragment>
    <Nav />
    <div className="App">
    <BookList books={mockBooks} />
    </div>
    </React.Fragment>
  );
}

export default App;
