import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import { dashboardMessagesLoader } from "./service/messages-loader";
import Dashboard from "./components/Dashboard";
import Contacts from "./components/Contacts";
import { contactAction, contactFormAction, contactLoader, getContacts } from "./service/contacts-service";
import ContactDetails from "./components/ContactDetails";
import ErrorPage from "./components/ErrorPage";
import ContactDetailsForm from "./components/ContactDetailsForm";

const router = createBrowserRouter([
  {
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
        shouldRevalidate: ({ currentUrl }) => {
          console.log(currentUrl);
          return !currentUrl.pathname.startsWith('/contacts')
        },
        element: <Contacts />,
        children: [
          {
            path: ':contactId',
            loader: contactLoader,
            action: contactAction,
            element: <ContactDetails />,
            errorElement: <ErrorPage />,
          },
          {
            path: ':contactId/edit',
            loader: contactLoader,
            action: contactFormAction,
            shouldRevalidate: ({ actionResult }) => !actionResult?.errors,
            element: <ContactDetailsForm />,
            errorElement: <ErrorPage />,
          },
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
