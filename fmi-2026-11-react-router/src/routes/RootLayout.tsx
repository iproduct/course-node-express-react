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
import { useSnackbar } from '../contexts/SnackbarContext'

const navBtn = { color: 'inherit', textTransform: 'none' as const }

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/users', label: 'Users' },
] as const

const DRAWER_WIDTH = 280

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
            {NAV_LINKS.map(({ to, label }) => (
              <Button key={to} component={RouterLink} to={to} sx={navBtn}>
                {label}
              </Button>
            ))}
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
            {NAV_LINKS.map(({ to, label }) => (
              <ListItem key={to} disablePadding>
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
