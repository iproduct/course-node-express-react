import React from 'react';
import './App.css';
import Nav from './Nav';
import BookList from './BookList';
import mockBooks from './mock-books';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <Switch>
            <Route path="/about">About</Route>
            <Route path="/users">Users</Route>
            <Route path="/">
              <Header />
              <BookList books={mockBooks} />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
