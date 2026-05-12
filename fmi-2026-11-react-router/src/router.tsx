import { createBrowserRouter } from 'react-router'
import {
  BlogDetailPage,
  blogDetailAction,
  blogDetailLoader,
} from './routes/blogs/BlogDetailPage'
import {
  BlogEditPage,
  blogEditAction,
  blogEditLoader,
} from './routes/blogs/BlogEditPage'
import {
  BlogNewPage,
  blogNewAction,
  blogNewLoader,
} from './routes/blogs/BlogNewPage'
import { BlogsListPage, blogsListLoader } from './routes/blogs/BlogsListPage'
import { HomePage } from './routes/HomePage'
import { RootLayout } from './routes/RootLayout'
import { RouteErrorBoundary } from './routes/RouteErrorBoundary'
import {
  UserDetailPage,
  userDetailLoader,
} from './routes/users/UserDetailPage'
import {
  UserEditPage,
  userEditAction,
  userEditLoader,
} from './routes/users/UserEditPage'
import { UsersListPage, usersListLoader } from './routes/users/UsersListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blogs', element: <BlogsListPage />, loader: blogsListLoader },
      {
        path: 'blogs/new',
        element: <BlogNewPage />,
        loader: blogNewLoader,
        action: blogNewAction,
      },
      {
        path: 'blogs/:blogId',
        element: <BlogDetailPage />,
        loader: blogDetailLoader,
        action: blogDetailAction,
      },
      {
        path: 'blogs/:blogId/edit',
        element: <BlogEditPage />,
        loader: blogEditLoader,
        action: blogEditAction,
      },
      { path: 'users', element: <UsersListPage />, loader: usersListLoader },
      {
        path: 'users/:userId',
        element: <UserDetailPage />,
        loader: userDetailLoader,
      },
      {
        path: 'users/:userId/edit',
        element: <UserEditPage />,
        loader: userEditLoader,
        action: userEditAction,
      },
    ],
  },
])
