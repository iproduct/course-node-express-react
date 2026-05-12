import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState, type SubmitEvent } from 'react'
import {
  Link as RouterLink,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

export function RegisterPage() {
  const { session, register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectParam = searchParams.get('redirect')
  const safeRedirect =
    redirectParam &&
    redirectParam.startsWith('/') &&
    !redirectParam.startsWith('//')
      ? redirectParam
      : null
  const loginTo =
    safeRedirect != null
      ? `/login?redirect=${encodeURIComponent(safeRedirect)}`
      : '/login'

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (session) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      const result = await register({ username, password, email })
      if (result.ok === true) {
        navigate(safeRedirect ?? '/', { replace: true })
      } else {
        setError(result.error)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: { xs: 1, sm: 3 } }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Register
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Creates a user via <code>POST /api/users</code> (json-server) and stores the session in
          this browser. The API must be running (e.g. <code>npm run dev:full</code>).
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
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Confirm password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={submitting}
            >
              {submitting ? 'Creating…' : 'Create account'}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <RouterLink to={loginTo}>Sign in</RouterLink>
        </Typography>
      </Paper>
    </Box>
  )
}
