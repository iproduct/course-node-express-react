import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from './About';
import './App.css';
import { Back } from './Back';
import Hello from './Hello';
import { Nav } from './Nav';
import { NotFound } from './NotFound';
import TodoFeature from './TodoFeature';

function App() {
    return (
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<TodoFeature />} />
          <Route path="/hello" element={<Hello name="User" />} />
          <Route path="/about" element={<About application="React TODO Demo" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Back />
      </BrowserRouter>
    );
}

export default App;
