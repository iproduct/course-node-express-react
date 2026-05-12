import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { data, Form, Link as RouterLink, useLoaderData } from 'react-router'
import { apiDelete, apiGet, ApiError } from '../../api/client'
import type { Blog, User } from '../../api/types'
import { useAuth } from '../../contexts/AuthContext'
import { redirectWithFlash } from '../../utils/redirectFlash'
import { userFullName } from '../../utils/userDisplay'
import { routeEntityId } from '../../utils/entityId'

export async function blogDetailLoader({ params }: LoaderFunctionArgs) {
  const id = routeEntityId(params.blogId)
  if (!id) throw data('Invalid blog id', { status: 400 })
  try {
    const blog = await apiGet<Blog>(`/blogs/${encodeURIComponent(id)}`)
    const author = await apiGet<User>(
      `/users/${encodeURIComponent(String(blog.userId))}`,
    )
    return { blog, author }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      throw data('Blog not found', { status: 404 })
    }
    throw e
  }
}

export async function blogDetailAction({ request, params }: ActionFunctionArgs) {
  const id = routeEntityId(params.blogId)
  if (!id || request.method !== 'DELETE') return null
  try {
    await apiDelete(`/blogs/${encodeURIComponent(id)}`)
    return redirectWithFlash('/blogs', 'success', 'Blog deleted')
  } catch (e) {
    const msg = e instanceof ApiError ? e.message : 'Delete failed'
    return redirectWithFlash(`/blogs/${encodeURIComponent(id)}`, 'error', msg)
  }
}

type LoaderData = Awaited<ReturnType<typeof blogDetailLoader>>

export function BlogDetailPage() {
  const { blog, author } = useLoaderData() as LoaderData
  const { session } = useAuth()
  const canOpenAuthorProfile =
    session?.role === 'admin' ||
    String(session?.apiUserId) === String(author.id)

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
          <Typography color="text.secondary" component="div">
            By{' '}
            {canOpenAuthorProfile ? (
              <Button
                component={RouterLink}
                to={`/users/${author.id}`}
                sx={{
                  textTransform: 'none',
                  p: 0,
                  minWidth: 0,
                  verticalAlign: 'baseline',
                }}
              >
                {userFullName(author)}
              </Button>
            ) : (
              <Box component="span" sx={{ fontWeight: 600 }}>
                {userFullName(author)}
              </Box>
            )}
            <Typography component="span" color="text.secondary" sx={{ ml: 0.5 }}>
              (@{author.username})
            </Typography>
          </Typography>
          {blog.imageUrl ? (
            <Box
              component="img"
              src={blog.imageUrl}
              alt={blog.title}
              sx={{
                width: '100%',
                maxHeight: 360,
                objectFit: 'cover',
                borderRadius: 1,
                display: 'block',
              }}
            />
          ) : null}
          {(blog.keywords ?? []).length > 0 ? (
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {(blog.keywords ?? []).map((kw) => (
                <Chip key={kw} label={kw} size="small" variant="outlined" />
              ))}
            </Stack>
          ) : null}
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{blog.content}</Typography>
        </Stack>
      </Paper>
    </Stack>
  )
}
