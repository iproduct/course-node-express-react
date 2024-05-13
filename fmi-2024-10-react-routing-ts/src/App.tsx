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
import NoMatch from "./components/NoMatch";
import { dashboardMessagesLoader } from "./service/messages-loader";
import Dashboard from "./components/Dashboard";
import Contacts from "./components/Contacts";
import { getContacts } from "./service/contacts-loader";
import ContactDetails from "./components/ContactDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/dashboard",
        loader: dashboardMessagesLoader,
        element: <Dashboard />
      },
      {
        path: "/contacts",
        loader: getContacts,
        element: <Contacts />,
        children: [
          {
            path: ':contactId',
            element: <ContactDetails />
          }
        ]
      },
      { path: "/about", element: <About /> },
      { path: '*', element: <NoMatch /> }
    ]
  }
]);

function App() {
  return (<RouterProvider router={router} />);
}

export default App;
