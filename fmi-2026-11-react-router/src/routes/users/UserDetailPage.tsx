import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import type { LoaderFunctionArgs } from 'react-router'
import { data, Link as RouterLink, useLoaderData } from 'react-router'
import { apiGet, ApiError } from '../../api/client'
import type { Blog, User } from '../../api/types'

export async function userDetailLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.userId)
  if (!Number.isFinite(id)) throw data('Invalid user id', { status: 400 })
  try {
    const user = await apiGet<User>(`/users/${id}`)
    const blogs = await apiGet<Blog[]>(`/blogs?userId=${id}`)
    return { user, blogs }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      throw data('User not found', { status: 404 })
    }
    throw e
  }
}

type LoaderData = Awaited<ReturnType<typeof userDetailLoader>>

export function UserDetailPage() {
  const { user, blogs } = useLoaderData() as LoaderData

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Button component={RouterLink} to="/users" variant="outlined">
          ← All users
        </Button>
        <Button
          component={RouterLink}
          to={`/users/${user.id}/edit`}
          variant="contained"
        >
          Edit user
        </Button>
      </Stack>

      <Paper sx={{ p: 3 }} elevation={0} variant="outlined">
        <Stack spacing={1}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography color="text.secondary">{user.email}</Typography>
          <Chip size="small" label={user.role} variant="outlined" sx={{ alignSelf: 'flex-start' }} />
        </Stack>
      </Paper>

      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Blogs by this author
      </Typography>
      <Table component={Paper} elevation={0} variant="outlined">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography color="text.secondary" sx={{ py: 1 }}>
                  No blogs yet.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/blogs/${blog.id}`}
                    sx={{ textTransform: 'none', p: 0, fontWeight: 600 }}
                  >
                    {blog.title}
                  </Button>
                </TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  {blog.published ? 'Published' : 'Draft'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Stack>
  )
}
