import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { data, Form, Link as RouterLink, useLoaderData } from 'react-router'
import { apiDelete, apiGet, ApiError } from '../../api/client'
import type { Blog, User } from '../../api/types'
import { redirectWithFlash } from '../../utils/redirectFlash'

export async function blogDetailLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.blogId)
  if (!Number.isFinite(id)) throw data('Invalid blog id', { status: 400 })
  try {
    const blog = await apiGet<Blog>(`/blogs/${id}`)
    const author = await apiGet<User>(`/users/${blog.userId}`)
    return { blog, author }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      throw data('Blog not found', { status: 404 })
    }
    throw e
  }
}

export async function blogDetailAction({ request, params }: ActionFunctionArgs) {
  const id = Number(params.blogId)
  if (!Number.isFinite(id) || request.method !== 'DELETE') return null
  try {
    await apiDelete(`/blogs/${id}`)
    return redirectWithFlash('/blogs', 'success', 'Blog deleted')
  } catch (e) {
    const msg = e instanceof ApiError ? e.message : 'Delete failed'
    return redirectWithFlash(`/blogs/${id}`, 'error', msg)
  }
}

type LoaderData = Awaited<ReturnType<typeof blogDetailLoader>>

export function BlogDetailPage() {
  const { blog, author } = useLoaderData() as LoaderData

  return (
    <Stack spacing={3} sx={{ maxWidth: 800 }}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Button component={RouterLink} to="/blogs" variant="outlined">
          ← All blogs
        </Button>
        <Button component={RouterLink} to={`/blogs/${blog.id}/edit`} variant="contained">
          Edit
        </Button>
        <Form
          method="delete"
          replace
          onSubmit={(e) => {
            if (!confirm('Delete this blog permanently?')) e.preventDefault()
          }}
        >
          <Button type="submit" color="error" variant="outlined">
            Delete
          </Button>
        </Form>
      </Stack>

      <Paper sx={{ p: 3 }} elevation={0} variant="outlined">
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {blog.title}
            </Typography>
            <Chip
              size="small"
              label={blog.published ? 'Published' : 'Draft'}
              color={blog.published ? 'success' : 'warning'}
              variant="outlined"
            />
            <Chip size="small" label={blog.category} variant="outlined" />
          </Stack>
          <Typography color="text.secondary">
            By{' '}
            <Button
              component={RouterLink}
              to={`/users/${author.id}`}
              sx={{ textTransform: 'none', p: 0, minWidth: 0, verticalAlign: 'baseline' }}
            >
              {author.name}
            </Button>
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{blog.content}</Typography>
        </Stack>
      </Paper>
    </Stack>
  )
}
