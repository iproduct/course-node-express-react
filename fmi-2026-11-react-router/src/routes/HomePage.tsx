import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'

export function HomePage() {
  return (
    <Stack spacing={3} sx={{ alignItems: 'stretch', maxWidth: 900 }}>
      <Stack spacing={1}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Blog &amp; user admin demo
        </Typography>
        <Typography color="text.secondary">
          This project is a small CRUD-style admin UI backed by a fake REST API. It is
          built to showcase{' '}
          <strong>React Router 7 data APIs</strong> (loaders and actions) together with
          Material UI, Vite, and json-server.
        </Typography>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Run locally
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Start the API and the dev server together:
        </Typography>
        <Typography
          component="pre"
          sx={{
            m: 0,
            p: 1.5,
            borderRadius: 1,
            bgcolor: 'action.hover',
            fontSize: '0.85rem',
            overflow: 'auto',
          }}
        >
          npm run dev:full
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Vite proxies <code>/api</code> to json-server on port <strong>3001</strong>.
          Data lives in <code>db.json</code>.
        </Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Libraries &amp; tooling
        </Typography>
        <Stack
          component="ul"
          sx={{ m: 0, pl: 2.5, color: 'text.secondary', '& li': { mb: 0.75 } }}
        >
          <li>
            <strong>React</strong> ^19 and <strong>react-dom</strong> — UI runtime.
          </li>
          <li>
            <strong>react-router</strong> ^7 — routing, nested routes, and{' '}
            <strong>data routing</strong> (<code>createBrowserRouter</code>, loaders,
            actions, <code>Form</code>, redirects, error boundaries).
          </li>
          <li>
            <strong>Vite</strong> ^8 and <strong>@vitejs/plugin-react</strong> — dev
            server, build, and HMR.
          </li>
          <li>
            <strong>TypeScript</strong> ~6 — typed routes and API models.
          </li>
          <li>
            <strong>Material UI</strong> ^9 (<strong>@mui/material</strong>),{' '}
            <strong>@mui/icons-material</strong>, and <strong>Emotion</strong> (
            <code>@emotion/react</code>, <code>@emotion/styled</code>) — components and
            styling.
          </li>
          <li>
            <strong>json-server</strong> (dev) — REST API from <code>db.json</code>.
          </li>
          <li>
            <strong>concurrently</strong> (dev) — run API + Vite with one command.
          </li>
          <li>
            <strong>ESLint</strong>, <strong>TypeScript ESLint</strong>, React Hooks and
            React Refresh plugins — linting.
          </li>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Implemented product features
        </Typography>
        <Stack
          component="ul"
          sx={{ m: 0, pl: 2.5, color: 'text.secondary', '& li': { mb: 0.75 } }}
        >
          <li>
            <strong>Blogs</strong> — list with search and filters (query string drives a
            loader); detail view; create, edit, and delete (mutations via route{' '}
            <code>action</code>s and <code>Form</code>).
          </li>
          <li>
            <strong>Users</strong> — list, read-only detail (with blogs by author), and
            edit (PUT via <code>action</code>).
          </li>
          <li>
            <strong>Rich models</strong> — blogs include cover image URL and keyword
            tags; users include profile image, username, name fields, and password
            (demo-only storage in JSON).
          </li>
          <li>
            <strong>Feedback</strong> — MUI snackbars (15s) for success (green) and
            errors (red); flash messages after redirects; route-level error UI.
          </li>
          <li>
            <strong>Responsive shell</strong> — top app bar; on small screens a
            hamburger opens a navigation drawer.
          </li>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          React Router — data routing (what this demo uses)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          The app uses a <strong>data router</strong>: the route tree is defined with{' '}
          <code>createBrowserRouter</code> in <code>src/router.tsx</code> and rendered
          with <code>RouterProvider</code> in <code>src/main.tsx</code>. That enables
          loaders and actions to run as part of navigation and form submission, instead
          of fetching only inside components.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Loaders (<code>loader</code>)
        </Typography>
        <Stack
          component="ul"
          sx={{ m: 0, pl: 2.5, color: 'text.secondary', mb: 2, '& li': { mb: 0.75 } }}
        >
          <li>
            Run before the route renders. They receive <code>LoaderFunctionArgs</code>{' '}
            (including <code>request</code>, <code>params</code>).
          </li>
          <li>
            <strong>Blogs list</strong> — reads <code>request.url</code> for filter
            search params, then fetches filtered blogs plus users and category options.
          </li>
          <li>
            <strong>Blog / user detail and edit</strong> — use <code>params</code>{' '}
            (e.g. <code>blogId</code>, <code>userId</code>) to load a single record (and
            related data).
          </li>
          <li>
            Pages consume results with <code>useLoaderData()</code>. Not-found cases use{' '}
            <code>throw data(message, {'{'} status: 404 {'}'})</code> so the nearest{' '}
            <code>errorElement</code> can run.
          </li>
        </Stack>

        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Actions (<code>action</code>)
        </Typography>
        <Stack
          component="ul"
          sx={{ m: 0, pl: 2.5, color: 'text.secondary', mb: 2, '& li': { mb: 0.75 } }}
        >
          <li>
            Run when a <strong>submission navigation</strong> targets the route — here via{' '}
            React Router’s <code>Form</code> with <code>method</code> set to{' '}
            <code>post</code>, <code>put</code>, or <code>delete</code>.
          </li>
          <li>
            Handlers read <code>request.formData()</code>, call the REST client, then
            return <code>redirect(...)</code> (with flash query params for snackbars) or
            a JSON object for inline validation/API errors (read with{' '}
            <code>useActionData()</code>).
          </li>
          <li>
            <code>useNavigation()</code> exposes <code>navigation.state</code> so forms
            can show a busy state while an action is in flight.
          </li>
        </Stack>

        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Declarative data forms
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Filter and search use <code>Form method=&quot;get&quot;</code> so the URL is
          the source of truth and the list loader re-runs on each filter apply. Create
          and update use <code>method=&quot;post&quot;</code> or{' '}
          <code>method=&quot;put&quot;</code>; delete uses{' '}
          <code>method=&quot;delete&quot;</code> on the blog detail route.
        </Typography>

        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Errors and redirects
        </Typography>
        <Stack
          component="ul"
          sx={{ m: 0, pl: 2.5, color: 'text.secondary', '& li': { mb: 0.75 } }}
        >
          <li>
            Root route <code>errorElement</code> — <code>RouteErrorBoundary</code> uses{' '}
            <code>useRouteError()</code> and <code>isRouteErrorResponse()</code> to show
            a friendly page and a red snackbar.
          </li>
          <li>
            <code>redirect()</code> plus query params — after successful mutations,
            redirects carry <code>flash</code> and <code>msg</code>;{' '}
            <code>RootLayout</code> shows a snackbar and strips those params with{' '}
            <code>useNavigate</code> / <code>useSearchParams</code>.
          </li>
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <Button component={RouterLink} to="/blogs" variant="contained">
          Open blogs
        </Button>
        <Button component={RouterLink} to="/users" variant="outlined">
          Open users
        </Button>
      </Stack>
    </Stack>
  )
}
