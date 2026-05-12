import { data, redirect } from 'react-router'
import type { MockAuthSession } from '../services/mockAuth'
import { getSession } from '../services/mockAuth'

const LOGIN = '/login'

function loginRedirectUrl(request: Request): string {
  const url = new URL(request.url)
  const returnTo = `${url.pathname}${url.search}`
  return `${LOGIN}?redirect=${encodeURIComponent(returnTo)}`
}

/** Use from route actions when the session is missing. */
export function redirectToLogin(request: Request) {
  return redirect(loginRedirectUrl(request))
}

/** Requires a mock-auth session; otherwise redirects to login with return URL. */
export function requireSession(request: Request): MockAuthSession {
  const session = getSession()
  if (!session) {
    throw redirect(loginRedirectUrl(request))
  }
  return session
}

/** Non-admins hitting the full user list are sent to their own profile. */
export function redirectNonAdminFromUserList(session: MockAuthSession, request: Request) {
  const url = new URL(request.url)
  if (url.pathname !== '/users') return
  if (session.role !== 'admin') {
    throw redirect(`/users/${session.apiUserId}`)
  }
}

/** Only admins may open arbitrary profiles; others only their own id. */
export function assertCanAccessUserProfile(session: MockAuthSession, targetUserId: number) {
  if (session.role === 'admin') return
  if (targetUserId !== session.apiUserId) {
    throw data('You can only view your own user profile.', { status: 403 })
  }
}
