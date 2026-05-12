import { useEffect, useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { useSnackbar } from '../contexts/SnackbarContext'

const navBtn = { color: 'inherit', textTransform: 'none' as const }

export function RootLayout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { showSuccess, showError } = useSnackbar()
  const flashKey = useRef<string | null>(null)

  useEffect(() => {
    const flash = searchParams.get('flash')
    const msg = searchParams.get('msg')
    if (!flash || !msg) {
      flashKey.current = null
      return
    }

    const key = `${location.pathname}?${searchParams.toString()}`
    if (flashKey.current === key) return
    flashKey.current = key

    if (flash === 'success') showSuccess(msg)
    else showError(msg)

    const next = new URLSearchParams(searchParams)
    next.delete('flash')
    next.delete('msg')
    const search = next.toString()
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : '' },
      { replace: true },
    )
  }, [
    location.pathname,
    navigate,
    searchParams,
    showError,
    showSuccess,
  ])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Blog admin
          </Typography>
          <Button component={RouterLink} to="/" sx={navBtn}>
            Home
          </Button>
          <Button component={RouterLink} to="/blogs" sx={navBtn}>
            Blogs
          </Button>
          <Button component={RouterLink} to="/users" sx={navBtn}>
            Users
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
