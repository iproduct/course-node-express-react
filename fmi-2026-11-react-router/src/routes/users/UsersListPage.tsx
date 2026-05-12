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
import { Link as RouterLink, useLoaderData } from 'react-router'
import { apiGet } from '../../api/client'
import type { User } from '../../api/types'

export async function usersListLoader() {
  const users = await apiGet<User[]>(`/users`)
  return { users }
}

type LoaderData = Awaited<ReturnType<typeof usersListLoader>>

const roleColor = {
  admin: 'error',
  author: 'primary',
  reader: 'default',
} as const

export function UsersListPage() {
  const { users } = useLoaderData() as LoaderData

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Users
      </Typography>
      <Table component={Paper} elevation={0} variant="outlined">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Button
                  component={RouterLink}
                  to={`/users/${user.id}`}
                  sx={{ textTransform: 'none', p: 0, fontWeight: 600 }}
                >
                  {user.name}
                </Button>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={user.role}
                  color={roleColor[user.role]}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  component={RouterLink}
                  to={`/users/${user.id}/edit`}
                  size="small"
                  variant="outlined"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}
