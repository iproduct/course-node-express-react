import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './Home';
import AboutUs from './AboutUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Home /> },
      {path: 'home', element: <Home /> },
      {path: 'about', element: <AboutUs /> },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
