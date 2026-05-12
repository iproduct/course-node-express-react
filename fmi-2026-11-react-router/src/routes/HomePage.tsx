import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'

export function HomePage() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Welcome
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
        Manage blogs and users against a local{' '}
        <strong>json-server</strong> API. Run{' '}
        <code style={{ fontSize: '0.95em' }}>npm run dev:full</code> so the UI
        and API start together.
      </Typography>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <Button component={RouterLink} to="/blogs" variant="contained">
          Blogs
        </Button>
        <Button component={RouterLink} to="/users" variant="outlined">
          Users
        </Button>
      </Stack>
    </Stack>
  )
}
