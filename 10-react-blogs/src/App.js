import React from 'react';
import ArticlesList from './articles/ArticlesList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Blogs</h1>
      </header>
      <ArticlesList></ArticlesList>
    </div>
  );
}

export default App;
