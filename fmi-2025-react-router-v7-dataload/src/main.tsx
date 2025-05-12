import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './routes/Home';
import Layout from './routes/Layout';
import About from './routes/About';
import NoMatch from './routes/NoMatch';
import { dashboardMessagesLoader } from './service/messages-loader';
import Dashboard from './routes/Dashboard';
import { contactAction, contactFormAction, contactLoader, getContacts } from './service/contacts-service';
import Contacts from './routes/Contacts';
import ContactDetails from './routes/ContactDetails';
import ErrorPage from './routes/ErrorPage';
import ContactDetailsForm from './routes/ContactDetailsForm';

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
]},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
