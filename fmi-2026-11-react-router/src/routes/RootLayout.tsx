import MenuIcon from '@mui/icons-material/Menu'
import { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useSnackbar } from '../contexts/SnackbarContext'
import type { MockAuthSession } from '../services/mockAuth'

const navBtn = { color: 'inherit', textTransform: 'none' as const }

const DRAWER_WIDTH = 280

function primaryNavItems(session: MockAuthSession | null) {
  const core = [
    { key: 'home', to: '/', label: 'Home' },
    { key: 'blogs', to: '/blogs', label: 'Blogs' },
  ] as const
  if (!session) {
    return [...core, { key: 'users', to: '/users', label: 'Users' as const }]
  }
  if (session.role === 'admin') {
    return [...core, { key: 'users', to: '/users', label: 'Users' as const }]
  }
  return [
    ...core,
    {
      key: 'profile',
      to: `/users/${session.apiUserId}`,
      label: 'My profile' as const,
    },
  ]
}

function navLinkSelected(to: string, pathname: string): boolean {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function RootLayout() {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { showSuccess, showError } = useSnackbar()
  const { session, logout } = useAuth()
  const flashKey = useRef<string | null>(null)
  const navItems = primaryNavItems(session)

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
          <IconButton
            color="inherit"
            aria-label="open navigation menu"
            edge="start"
            onClick={() => setMobileNavOpen(true)}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog admin
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {navItems.map(({ key, to, label }) => (
              <Button key={key} component={RouterLink} to={to} sx={navBtn}>
                {label}
              </Button>
            ))}
            {session ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    ml: 1,
                    mr: 0.5,
                    maxWidth: 160,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={session.displayName}
                >
                  {session.displayName}
                </Typography>
                <Button color="inherit" variant="outlined" size="small" onClick={() => logout()}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/login" sx={navBtn}>
                  Sign in
                </Button>
                <Button component={RouterLink} to="/register" sx={navBtn}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        variant="temporary"
        open={mobileNavOpen && !isMdUp}
        onClose={() => setMobileNavOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ px: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, pb: 1 }}>
            Navigate
          </Typography>
          <List dense disablePadding>
            {navItems.map(({ key, to, label }) => (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={to}
                  selected={navLinkSelected(to, location.pathname)}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
            {!session ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/login"
                    selected={navLinkSelected('/login', location.pathname)}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <ListItemText primary="Sign in" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/register"
                    selected={navLinkSelected('/register', location.pathname)}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    logout()
                    setMobileNavOpen(false)
                  }}
                >
                  <ListItemText primary={`Log out (${session.displayName})`} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
