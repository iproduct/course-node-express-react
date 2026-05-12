import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const AUTO_HIDE_MS = 15_000

type Severity = 'success' | 'error'

type SnackbarContextValue = {
  showSuccess: (message: string) => void
  showError: (message: string) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext)
  if (!ctx) {
    throw new Error('useSnackbar must be used within SnackbarProvider')
  }
  return ctx
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<Severity>('success')

  const showSuccess = useCallback((msg: string) => {
    setMessage(msg)
    setSeverity('success')
    setOpen(true)
  }, [])

  const showError = useCallback((msg: string) => {
    setMessage(msg)
    setSeverity('error')
    setOpen(true)
  }, [])

  const handleClose = useCallback((_?: unknown, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }, [])

  const value = useMemo(
    () => ({ showSuccess, showError }),
    [showSuccess, showError],
  )

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={AUTO_HIDE_MS}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{
            width: '100%',
            ...(severity === 'success'
              ? {
                  bgcolor: 'success.dark',
                  color: 'success.contrastText',
                }
              : {
                  bgcolor: 'error.main',
                  color: 'error.contrastText',
                }),
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
