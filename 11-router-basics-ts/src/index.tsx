import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ActionFunctionArgs, createBrowserRouter, LoaderFunction, LoaderFunctionArgs, Params, redirect, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ContactPage from './pages/ContanctPage';
import RootPage from './pages/RootPage';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import PostPage from './pages/PostPage';
import { PostsApi } from './service/rest-api-client';

export async function postsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  if (q) {
    return PostsApi.findByTitleLike(q);
  } else {
    return PostsApi.findAll();
  }
}

export function postLoader({ params }: LoaderFunctionArgs ) {
  if (params.postId) {
    return PostsApi.findById(+params.postId);
  } else {
    throw new Error(`Invalid or missing post ID`);
  }
}

export async function postAction({ request, params }: ActionFunctionArgs) {
  if (request.method === 'DELETE') {
    params.postId && await PostsApi.deleteById(+params.postId);
    return redirect('/posts');
  } else if (request.method === 'POST') {
    let formData = await request.formData();
    let favorite = formData.get('favorite');
    console.log(favorite);
    if (favorite !== null && params.postId) {
      return PostsApi.patchById(+params.postId, {favorite: (favorite ? favorite === 'false': undefined)});
    }
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [{
      errorElement: <ErrorPage />,
      children: [{
        index: true,
        element: <HomePage />,
      }, {
        path: "contacts/:contactId",
        element: <ContactPage />,
      }, {
        path: "posts",
        loader: postsLoader,
        element: <PostsPage />,
        children: [{
          errorElement: <ErrorPage />,
          path: ":postId",
          action: postAction,
          loader: postLoader,
          element: <PostPage />,
        }]
      }, {
        path: '*',
        element: <ErrorPage />,
      }]
    }]
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
