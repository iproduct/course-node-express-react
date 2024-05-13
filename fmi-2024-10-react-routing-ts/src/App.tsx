import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Home />},
      {path: "/home", element: <Home />},
      {path: "/about", element: <About />},
    ]
  }
]);

function App() {
  return (<RouterProvider router={router} />);
}

export default App;
