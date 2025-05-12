import { useRouteError } from "react-router";
import './ErrorPage.css';

interface RouteError extends Error {
  statusText?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page" className="ErrorPage-container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || 'Page not found'}</i>
      </p>
    </div>
  );
}