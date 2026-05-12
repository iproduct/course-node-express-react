import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { useSnackbar } from '../contexts/SnackbarContext'

export function RouteErrorBoundary() {
  const error = useRouteError()
  const { showError } = useSnackbar()

  useEffect(() => {
    let message = 'Something went wrong'
    if (isRouteErrorResponse(error)) {
      message =
        typeof error.data === 'string'
          ? error.data
          : error.statusText || `Error ${error.status}`
    } else if (error instanceof Error) {
      message = error.message
    }
    showError(message)
  }, [error, showError])

  const status = isRouteErrorResponse(error) ? error.status : null

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {status === 404 ? 'Not found' : status === 403 ? 'Forbidden' : 'Unexpected error'}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Check the snackbar for details, or return home and try again.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
    </Paper>
  )
}
