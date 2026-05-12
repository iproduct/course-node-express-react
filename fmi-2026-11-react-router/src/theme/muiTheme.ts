import { createTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

/**
 * Light-only pastel palette: blue, magenta, green, yellow, red (error),
 * plus a softer blue for `info`.
 */
export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7DACD9',
      light: '#B8D4EB',
      dark: '#4A7AAE',
      contrastText: '#0F2740',
    },
    secondary: {
      main: '#D9A5D4',
      light: '#EED6EB',
      dark: '#9A6B96',
      contrastText: '#2D152A',
    },
    success: {
      main: '#8FC9A8',
      light: '#C8E8D4',
      dark: '#5E9A7A',
      contrastText: '#143222',
    },
    warning: {
      main: '#EDD98A',
      light: '#F5ECC4',
      dark: '#C4B45E',
      contrastText: '#3D3510',
    },
    error: {
      light: '#FEECEC',
      main: '#B91C1C',
      dark: '#7F1D1D',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#9BB8D9',
      light: '#D6E3F2',
      dark: '#6E8FB8',
      contrastText: '#1A2F45',
    },
    background: {
      default: '#FAF8F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3D3A45',
      secondary: '#6B6575',
    },
    divider: 'rgba(107, 101, 117, 0.16)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      'system-ui',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({
          theme,
          ownerState,
        }: {
          theme: Theme
          ownerState: { severity?: string; color?: string; variant?: string }
        }) => {
          const color = ownerState.color ?? ownerState.severity
          const variant = ownerState.variant ?? 'standard'
          if (color !== 'error' || variant === 'filled') return {}
          return {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.dark,
            border: `1px solid ${theme.palette.error.main}`,
          }
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-error': {
            color: theme.palette.error.dark,
          },
        }),
      },
    },
  },
})
