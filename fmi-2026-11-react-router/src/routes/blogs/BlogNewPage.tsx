import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import type { ActionFunctionArgs } from 'react-router'
import {
  Form,
  Link as RouterLink,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router'
import { apiGet, apiPost, ApiError } from '../../api/client'
import type { Blog, User } from '../../api/types'
import { useSnackbar } from '../../contexts/SnackbarContext'
import { parseKeywordsInput } from '../../utils/keywords'
import { userAuthorMenuLabel } from '../../utils/userDisplay'
import { redirectWithFlash } from '../../utils/redirectFlash'

export async function blogNewLoader() {
  const users = await apiGet<User[]>(`/users`)
  return { users }
}

export async function blogNewAction({ request }: ActionFunctionArgs) {
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
    const blog = await apiPost<Blog>('/blogs', {
      title,
      content,
      userId,
      category: category || 'general',
      published,
      imageUrl,
      keywords,
    })
    return redirectWithFlash(`/blogs/${blog.id}`, 'success', 'Blog created')
  } catch (e) {
    const msg = e instanceof ApiError ? e.message : 'Could not create blog'
    return { ok: false as const, error: msg }
  }
}

type LoaderData = Awaited<ReturnType<typeof blogNewLoader>>
type ActionData = Awaited<ReturnType<typeof blogNewAction>>

export function BlogNewPage() {
  const { users } = useLoaderData() as LoaderData
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
        New blog
      </Typography>
      <Paper sx={{ p: 2 }} elevation={0} variant="outlined">
        <Form method="post" replace>
          <Stack spacing={2}>
            <TextField
              name="title"
              label="Title"
              required
              fullWidth
              disabled={busy}
            />
            <TextField
              name="content"
              label="Content"
              multiline
              minRows={6}
              fullWidth
              disabled={busy}
            />
            <TextField
              name="userId"
              select
              label="Author"
              required
              fullWidth
              defaultValue=""
              disabled={busy}
            >
              <MenuItem value="">
                <em>Select author</em>
              </MenuItem>
              {users.map((u) => (
                <MenuItem key={u.id} value={String(u.id)}>
                  {userAuthorMenuLabel(u)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="category"
              label="Category"
              placeholder="e.g. tech"
              fullWidth
              disabled={busy}
            />
            <TextField
              name="imageUrl"
              label="Cover image URL"
              placeholder="https://…"
              fullWidth
              disabled={busy}
            />
            <TextField
              name="keywords"
              label="Keywords"
              placeholder="react, router, tutorial"
              helperText="Separate keywords with commas, semicolons, or new lines."
              fullWidth
              disabled={busy}
            />
            <FormControlLabel
              control={<Checkbox name="published" disabled={busy} />}
              label="Published"
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" disabled={busy}>
                {busy ? 'Saving…' : 'Create'}
              </Button>
              <Button
                component={RouterLink}
                to="/blogs"
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
