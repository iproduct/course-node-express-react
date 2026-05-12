import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState, type SubmitEvent} from 'react'
import {
  Link as RouterLink,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

export function LoginPage() {
  const { session, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const redirectParam = searchParams.get('redirect')
  const safeRedirect =
    redirectParam &&
    redirectParam.startsWith('/') &&
    !redirectParam.startsWith('//')
      ? redirectParam
      : null
  const fromState =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
  const from = safeRedirect ?? fromState ?? '/'
  const registerTo =
    safeRedirect != null
      ? `/register?redirect=${encodeURIComponent(safeRedirect)}`
      : '/register'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (session) {
    return <Navigate to={from} replace />
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    setError(null)
    const result = login(username, password)
    if (result.ok === true) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: { xs: 1, sm: 3 } }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Sign in
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Mock login only — credentials stay in your browser and are not sent to json-server.
          Try <strong>alice_admin</strong> / <strong>changeme</strong>.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign in
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No account?{' '}
          <RouterLink to={registerTo}>Create one</RouterLink>
        </Typography>
      </Paper>
    </Box>
  )
}
