import type { User } from '../api/types'

export function userFullName(user: Pick<User, 'firstName' | 'lastName'>): string {
  return `${user.firstName} ${user.lastName}`.trim()
}

/** Label for author dropdowns: "First Last (@username) · role" */
export function userAuthorMenuLabel(user: User): string {
  const name = userFullName(user)
  const who = name ? `${name} (@${user.username})` : `@${user.username}`
  return `${who} · ${user.role}`
}
