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
import { useAuth } from '../../contexts/AuthContext'
import { useSnackbar } from '../../contexts/SnackbarContext'
import { redirectWithFlash } from '../../utils/redirectFlash'
import {
  assertCanAccessUserProfile,
  redirectToLogin,
  requireSession,
} from '../../utils/usersAccess'
import { getSession } from '../../services/mockAuth'
import { routeEntityId } from '../../utils/entityId'

const ROLES: UserRole[] = ['admin', 'author', 'reader']

export async function userEditLoader({ request, params }: LoaderFunctionArgs) {
  const session = requireSession(request)
  const id = routeEntityId(params.userId)
  if (!id) throw data('Invalid user id', { status: 400 })
  assertCanAccessUserProfile(session, id)
  try {
    const user = await apiGet<User>(`/users/${encodeURIComponent(id)}`)
    return { user }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      throw data('User not found', { status: 404 })
    }
    throw e
  }
}

export async function userEditAction({ request, params }: ActionFunctionArgs) {
  const session = getSession()
  if (!session) return redirectToLogin(request)

  const id = routeEntityId(params.userId)
  if (!id || request.method !== 'PUT') return null

  assertCanAccessUserProfile(session, id)

  const fd = await request.formData()
  const firstName = String(fd.get('firstName') ?? '').trim()
  const lastName = String(fd.get('lastName') ?? '').trim()
  const username = String(fd.get('username') ?? '').trim()
  const email = String(fd.get('email') ?? '').trim()
  const imageUrl = String(fd.get('imageUrl') ?? '').trim()
  const passwordInput = String(fd.get('password') ?? '')
  const roleFromForm = String(fd.get('role') ?? '') as UserRole

  if (!firstName) return { ok: false as const, error: 'First name is required' }
  if (!lastName) return { ok: false as const, error: 'Last name is required' }
  if (!username) return { ok: false as const, error: 'Username is required' }
  if (!email) return { ok: false as const, error: 'Email is required' }

  try {
    const existing = await apiGet<User>(`/users/${encodeURIComponent(id)}`)
    const role =
      session.role === 'admin' ? roleFromForm : existing.role
    if (!ROLES.includes(role)) return { ok: false as const, error: 'Invalid role' }

    const password =
      passwordInput.trim() !== '' ? passwordInput : existing.password

    await apiPut<User>(`/users/${encodeURIComponent(id)}`, {
      id,
      username,
      password,
      firstName,
      lastName,
      email,
      role,
      imageUrl,
    })
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
  const { session } = useAuth()
  const isAdmin = session?.role === 'admin'
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
              name="firstName"
              label="First name"
              required
              fullWidth
              defaultValue={user.firstName}
              disabled={busy}
            />
            <TextField
              name="lastName"
              label="Last name"
              required
              fullWidth
              defaultValue={user.lastName}
              disabled={busy}
            />
            <TextField
              name="username"
              label="Username"
              required
              fullWidth
              defaultValue={user.username}
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
              name="imageUrl"
              label="Profile image URL"
              fullWidth
              defaultValue={user.imageUrl}
              disabled={busy}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              fullWidth
              helperText="Leave blank to keep the current password."
              disabled={busy}
            />
            {isAdmin ? (
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
            ) : (
              <>
                <input type="hidden" name="role" value={user.role} />
                <Typography variant="body2" color="text.secondary">
                  Role: <strong>{user.role}</strong> — only an administrator can change roles.
                </Typography>
              </>
            )}
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
