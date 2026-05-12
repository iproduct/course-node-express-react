import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { SnackbarProvider } from './contexts/SnackbarContext'
import './index.css'
import { router } from './router'
import { muiTheme } from './theme/muiTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
)
