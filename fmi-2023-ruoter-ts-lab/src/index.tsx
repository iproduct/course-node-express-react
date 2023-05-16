import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { NavLink, RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />
      
    )
  },
  {
    path: '/about',
    element: (
      <div>
        <h1>About Us</h1>
        <NavLink className={({ isActive, isPending }) =>isActive ? "active" : isPending ? "pending" : "" } to="/">Home</NavLink> |
        <NavLink className={({ isActive, isPending }) =>isActive ? "active" : isPending ? "pending" : "" } to="/about">About Us</NavLink> |
      </div>
    )
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
