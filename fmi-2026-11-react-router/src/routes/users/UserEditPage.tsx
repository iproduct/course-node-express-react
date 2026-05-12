import Button from '@mui/material/Button'
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
import type { User, UserRole } from '../../api/types'
import { useSnackbar } from '../../contexts/SnackbarContext'
import { redirectWithFlash } from '../../utils/redirectFlash'

const ROLES: UserRole[] = ['admin', 'author', 'reader']

export async function userEditLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.userId)
  if (!Number.isFinite(id)) throw data('Invalid user id', { status: 400 })
  try {
    const user = await apiGet<User>(`/users/${id}`)
    return { user }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      throw data('User not found', { status: 404 })
    }
    throw e
  }
}

export async function userEditAction({ request, params }: ActionFunctionArgs) {
  const id = Number(params.userId)
  if (!Number.isFinite(id) || request.method !== 'PUT') return null

  const fd = await request.formData()
  const name = String(fd.get('name') ?? '').trim()
  const email = String(fd.get('email') ?? '').trim()
  const role = String(fd.get('role') ?? '') as UserRole

  if (!name) return { ok: false as const, error: 'Name is required' }
  if (!email) return { ok: false as const, error: 'Email is required' }
  if (!ROLES.includes(role)) return { ok: false as const, error: 'Invalid role' }

  try {
    await apiPut<User>(`/users/${id}`, { id, name, email, role })
    return redirectWithFlash(`/users/${id}`, 'success', 'User updated')
  } catch (e) {
    const msg = e instanceof ApiError ? e.message : 'Could not update user'
    return { ok: false as const, error: msg }
  }
}

type LoaderData = Awaited<ReturnType<typeof userEditLoader>>
type ActionData = Awaited<ReturnType<typeof userEditAction>>

export function UserEditPage() {
  const { user } = useLoaderData() as LoaderData
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
    <Stack spacing={3} sx={{ maxWidth: 560 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Edit user
      </Typography>
      <Paper sx={{ p: 2 }} elevation={0} variant="outlined">
        <Form method="put" replace>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              required
              fullWidth
              defaultValue={user.name}
              disabled={busy}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              required
              fullWidth
              defaultValue={user.email}
              disabled={busy}
            />
            <TextField
              name="role"
              select
              label="Role"
              required
              fullWidth
              defaultValue={user.role}
              disabled={busy}
            >
              {ROLES.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" disabled={busy}>
                {busy ? 'Saving…' : 'Save'}
              </Button>
              <Button
                component={RouterLink}
                to={`/users/${user.id}`}
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
