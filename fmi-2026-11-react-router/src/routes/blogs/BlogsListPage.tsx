import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { LoaderFunctionArgs } from 'react-router'
import { Form, Link as RouterLink, useLoaderData } from 'react-router'
import { apiGet } from '../../api/client'
import type { Blog, BlogFilters, User } from '../../api/types'
import { userFullName } from '../../utils/userDisplay'

function buildBlogQuery(url: URL): string {
  const params = new URLSearchParams()
  const q = url.searchParams.get('q')?.trim()
  const userId = url.searchParams.get('userId')?.trim()
  const category = url.searchParams.get('category')?.trim()
  const published = url.searchParams.get('published')?.trim()

  if (q) params.set('q', q)
  if (userId) params.set('userId', userId)
  if (category) params.set('category', category)
  if (published === 'true' || published === 'false') params.set('published', published)

  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export async function blogsListLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const qs = buildBlogQuery(url)
  const [blogs, users, allForCategories] = await Promise.all([
    apiGet<Blog[]>(`/blogs${qs}`),
    apiGet<User[]>(`/users`),
    apiGet<Blog[]>(`/blogs`),
  ])

  const filters: BlogFilters = {
    q: url.searchParams.get('q') ?? '',
    userId: url.searchParams.get('userId') ?? '',
    category: url.searchParams.get('category') ?? '',
    published: url.searchParams.get('published') ?? '',
  }

  const categories = [
    ...new Set(allForCategories.map((b) => b.category).filter(Boolean)),
  ].sort()

  return { blogs, users, filters, categories }
}

type LoaderData = Awaited<ReturnType<typeof blogsListLoader>>

export function BlogsListPage() {
  const { blogs, users, filters, categories } = useLoaderData() as LoaderData

  const userName = (id: number) => {
    const u = users.find((x) => String(x.id) === String(id))
    return u ? userFullName(u) : `User #${id}`
  }

  return (
    <Stack spacing={3}>
      <Stack
        spacing={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Blogs
        </Typography>
        <Button component={RouterLink} to="/blogs/new" variant="contained">
          New blog
        </Button>
      </Stack>

      <Paper sx={{ p: 2 }} elevation={0} variant="outlined">
        <Form method="get" replace>
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Search &amp; filters
            </Typography>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                name="q"
                label="Search"
                placeholder="Title, content, or keywords"
                defaultValue={filters.q}
                size="small"
                sx={{ minWidth: 220, flex: '1 1 200px' }}
              />
              <TextField
                name="userId"
                select
                label="Author"
                size="small"
                defaultValue={filters.userId || ''}
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                {users.map((u) => (
                  <MenuItem key={u.id} value={String(u.id)}>
                    {userFullName(u)} (@{u.username})
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="category"
                select
                label="Category"
                size="small"
                defaultValue={filters.category || ''}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="published"
                select
                label="Published"
                size="small"
                defaultValue={filters.published || ''}
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                <MenuItem value="true">Published</MenuItem>
                <MenuItem value="false">Draft</MenuItem>
              </TextField>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Button type="submit" variant="contained">
                  Apply
                </Button>
                <Button component={RouterLink} to="/blogs" variant="text">
                  Reset
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Form>
      </Paper>

      <Table component={Paper} elevation={0} variant="outlined">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 96 }}>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Keywords</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Box sx={{ py: 2, color: 'text.secondary' }}>
                  No blogs match these filters.
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>
                  {blog.imageUrl ? (
                    <Box
                      component="img"
                      src={blog.imageUrl}
                      alt=""
                      loading="lazy"
                      sx={{
                        width: 72,
                        height: 48,
                        objectFit: 'cover',
                        borderRadius: 1,
                        display: 'block',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 72,
                        height: 48,
                        borderRadius: 1,
                        bgcolor: 'action.hover',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/blogs/${blog.id}`}
                    sx={{ textTransform: 'none', p: 0, fontWeight: 600 }}
                  >
                    {blog.title}
                  </Button>
                </TableCell>
                <TableCell>{userName(blog.userId)}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    sx={{ flexWrap: 'wrap', gap: 0.5, maxWidth: 280 }}
                  >
                    {(blog.keywords ?? []).slice(0, 4).map((kw) => (
                      <Chip key={kw} label={kw} size="small" variant="outlined" />
                    ))}
                    {(blog.keywords ?? []).length > 4 ? (
                      <Chip
                        size="small"
                        variant="outlined"
                        label={`+${(blog.keywords ?? []).length - 4}`}
                      />
                    ) : null}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={blog.published ? 'Published' : 'Draft'}
                    color={blog.published ? 'success' : 'warning'}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Stack>
  )
}
