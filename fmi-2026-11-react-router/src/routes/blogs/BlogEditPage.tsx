import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import {
  data,
  Form,
  Link as RouterLink,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router'
import { apiGet, apiPut, ApiError } from '../../api/client'
import type { Blog, User } from '../../api/types'
import { useSnackbar } from '../../contexts/SnackbarContext'
import { keywordsToInput, parseKeywordsInput } from '../../utils/keywords'
import { userAuthorMenuLabel } from '../../utils/userDisplay'
import { redirectWithFlash } from '../../utils/redirectFlash'

export async function blogEditLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.blogId)
  if (!Number.isFinite(id)) throw data('Invalid blog id', { status: 400 })
  try {
    const blog = await apiGet<Blog>(`/blogs/${id}`)
    const users = await apiGet<User[]>(`/users`)
    return { blog, users }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      throw data('Blog not found', { status: 404 })
    }
    throw e
  }
}

export async function blogEditAction({ request, params }: ActionFunctionArgs) {
  const id = Number(params.blogId)
  if (!Number.isFinite(id) || request.method !== 'PUT') return null

  const fd = await request.formData()
  const title = String(fd.get('title') ?? '').trim()
  const content = String(fd.get('content') ?? '')
  const userId = Number(fd.get('userId'))
  const category = String(fd.get('category') ?? '').trim()
  const published = fd.get('published') === 'on'
  const imageUrl = String(fd.get('imageUrl') ?? '').trim()
  const keywords = parseKeywordsInput(String(fd.get('keywords') ?? ''))

  if (!title) return { ok: false as const, error: 'Title is required' }
  if (!Number.isFinite(userId)) return { ok: false as const, error: 'Author is required' }

  try {
    await apiPut<Blog>(`/blogs/${id}`, {
      id,
      title,
      content,
      userId,
      category: category || 'general',
      published,
      imageUrl,
      keywords,
    })
    return redirectWithFlash(`/blogs/${id}`, 'success', 'Blog updated')
  } catch (e) {
    const msg = e instanceof ApiError ? e.message : 'Could not update blog'
    return { ok: false as const, error: msg }
  }
}

type LoaderData = Awaited<ReturnType<typeof blogEditLoader>>
type ActionData = Awaited<ReturnType<typeof blogEditAction>>

export function BlogEditPage() {
  const { blog, users } = useLoaderData() as LoaderData
  const actionData = useActionData() as ActionData | undefined
  const navigation = useNavigation()
  const { showError } = useSnackbar()
  const busy = navigation.state !== 'idle'

  useEffect(() => {
    if (
      actionData &&
      typeof actionData === 'object' &&
      !(actionData instanceof Response) &&
      'ok' in actionData &&
      actionData.ok === false
    ) {
      showError(actionData.error)
    }
  }, [actionData, showError])

  return (
    <Stack spacing={3} sx={{ maxWidth: 720 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Edit blog
      </Typography>
      <Paper sx={{ p: 2 }} elevation={0} variant="outlined">
        <Form method="put" replace>
          <Stack spacing={2}>
            <TextField
              name="title"
              label="Title"
              required
              fullWidth
              defaultValue={blog.title}
              disabled={busy}
            />
            <TextField
              name="content"
              label="Content"
              multiline
              minRows={6}
              fullWidth
              defaultValue={blog.content}
              disabled={busy}
            />
            <TextField
              name="userId"
              select
              label="Author"
              required
              fullWidth
              defaultValue={String(blog.userId)}
              disabled={busy}
            >
              {users.map((u) => (
                <MenuItem key={u.id} value={String(u.id)}>
                  {userAuthorMenuLabel(u)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="category"
              label="Category"
              fullWidth
              defaultValue={blog.category}
              disabled={busy}
            />
            <TextField
              name="imageUrl"
              label="Cover image URL"
              fullWidth
              defaultValue={blog.imageUrl}
              disabled={busy}
            />
            <TextField
              name="keywords"
              label="Keywords"
              helperText="Separate keywords with commas, semicolons, or new lines."
              fullWidth
              defaultValue={keywordsToInput(blog.keywords)}
              disabled={busy}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="published"
                  defaultChecked={blog.published}
                  disabled={busy}
                />
              }
              label="Published"
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" disabled={busy}>
                {busy ? 'Saving…' : 'Save'}
              </Button>
              <Button
                component={RouterLink}
                to={`/blogs/${blog.id}`}
                variant="outlined"
                disabled={busy}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Paper>
    </Stack>
  )
}
