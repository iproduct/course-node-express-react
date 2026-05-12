/**
 * Demo-only auth: sign-in loads users from json-server (`GET /users`) and checks username/password
 * against those records. Session state is still stored only in the browser (localStorage).
 * Seed users in code mirror `db.json` only for legacy session migration helpers.
 */

import { apiGet, apiPost, ApiError } from '../api/client'
import type { User, UserRole } from '../api/types'
import { sessionEntityId } from '../utils/entityId'

const SESSION_KEY = 'mock-auth-session'
const REGISTERED_KEY = 'mock-auth-registered-users'

export type MockAuthSession = {
  username: string
  email: string
  displayName: string
  role: UserRole
  /** Matches json-server `users[].id` when that row exists (includes locally registered mock ids). */
  apiUserId: string
}

function isUserRole(s: string): s is UserRole {
  return s === 'admin' || s === 'author' || s === 'reader'
}

type StoredUser = {
  id: string
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  role: string
}

const SEED_USERS: StoredUser[] = [
  {
    id: '1',
    username: 'alice_admin',
    password: 'changeme',
    firstName: 'Alice',
    lastName: 'Admin',
    email: 'alice@example.com',
    role: 'admin',
  },
  {
    id: '2',
    username: 'bob_author',
    password: 'changeme',
    firstName: 'Bob',
    lastName: 'Author',
    email: 'bob@example.com',
    role: 'author',
  },
  {
    id: '3',
    username: 'carol_reader',
    password: 'changeme',
    firstName: 'Carol',
    lastName: 'Reader',
    email: 'carol@example.com',
    role: 'reader',
  },
]

function readRegistered(): StoredUser[] {
  try {
    const raw = localStorage.getItem(REGISTERED_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isStoredUserShape)
  } catch {
    return []
  }
}

function isStoredUserShape(x: unknown): x is StoredUser {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.username === 'string' &&
    typeof o.password === 'string' &&
    typeof o.email === 'string' &&
    typeof o.firstName === 'string' &&
    typeof o.lastName === 'string' &&
    typeof o.role === 'string'
  )
}

function writeRegistered(users: StoredUser[]) {
  localStorage.setItem(REGISTERED_KEY, JSON.stringify(users))
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase()
}

function getAllUsers(): StoredUser[] {
  const registered = readRegistered()
  const seedNames = new Set(SEED_USERS.map((u) => normalizeUsername(u.username)))
  const extra = registered.filter(
    (u) => !seedNames.has(normalizeUsername(u.username)),
  )
  return [...SEED_USERS, ...extra]
}

export function getSession(): MockAuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const o = parsed as Record<string, unknown>
    if (
      typeof o.username !== 'string' ||
      typeof o.email !== 'string' ||
      typeof o.displayName !== 'string'
    ) {
      return null
    }

    const storedUsername = o.username
    const storedEmail = o.email
    const storedDisplayName = o.displayName

    const role: UserRole | undefined =
      typeof o.role === 'string' && isUserRole(o.role) ? o.role : undefined
    const apiUserId = sessionEntityId(o.apiUserId)

    if (role === undefined || apiUserId === undefined) {
      const user = getAllUsers().find(
        (x) => x.username.toLowerCase() === storedUsername.toLowerCase(),
      )
      if (!user || !isUserRole(user.role)) {
        clearSession()
        return null
      }
      if (!user.id.trim()) {
        clearSession()
        return null
      }
      const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
      const migrated: MockAuthSession = {
        username: user.username,
        email: user.email,
        displayName: displayName || user.username,
        role: user.role,
        apiUserId: user.id,
      }
      setSession(migrated)
      return migrated
    }

    const normalized: MockAuthSession = {
      username: storedUsername,
      email: storedEmail,
      displayName: storedDisplayName,
      role,
      apiUserId,
    }
    if (typeof o.apiUserId === 'number') {
      setSession(normalized)
    }
    return normalized
  } catch {
    return null
  }
}

function setSession(session: MockAuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export type LoginResult =
  | { ok: true; session: MockAuthSession }
  | { ok: false; error: string }

export async function login(
  username: string,
  password: string,
): Promise<LoginResult> {
  const u = username.trim()
  const p = password
  if (!u) return { ok: false, error: 'Username is required' }
  if (!p) return { ok: false, error: 'Password is required' }

  const key = normalizeUsername(u)
  try {
    const users = await apiGet<User[]>('/users')
    const user = users.find((x) => normalizeUsername(x.username) === key)
    if (!user || user.password !== p) {
      return { ok: false, error: 'Invalid username or password' }
    }

    const apiUserId = String(user.id).trim()
    if (!apiUserId) {
      return { ok: false, error: 'Invalid account' }
    }
    if (!isUserRole(user.role)) {
      return { ok: false, error: 'Invalid account role' }
    }

    const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
    const session: MockAuthSession = {
      username: user.username,
      email: user.email,
      displayName: displayName || user.username,
      role: user.role,
      apiUserId,
    }
    setSession(session)
    return { ok: true, session }
  } catch (e) {
    const msg =
      e instanceof ApiError
        ? e.message
        : 'Could not reach the API. Start json-server (e.g. npm run api or npm run dev:full).'
    return { ok: false, error: msg }
  }
}

export type RegisterResult =
  | { ok: true; session: MockAuthSession }
  | { ok: false; error: string }

export async function register(input: {
  username: string
  password: string
  email: string
}): Promise<RegisterResult> {
  const username = input.username.trim()
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (!username) return { ok: false, error: 'Username is required' }
  if (username.length < 2) return { ok: false, error: 'Username is too short' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Valid email is required' }
  }
  if (password.length < 4) {
    return { ok: false, error: 'Password must be at least 4 characters' }
  }

  const key = normalizeUsername(username)
  if (getAllUsers().some((x) => normalizeUsername(x.username) === key)) {
    return { ok: false, error: 'That username is already taken' }
  }

  try {
    const remoteUsers = await apiGet<User[]>('/users')
    if (
      remoteUsers.some((u) => normalizeUsername(u.username) === key)
    ) {
      return { ok: false, error: 'That username is already taken' }
    }
    if (
      remoteUsers.some((u) => u.email.trim().toLowerCase() === email)
    ) {
      return { ok: false, error: 'That email is already registered' }
    }

    const payload: Omit<User, 'id'> = {
      username,
      password,
      email,
      firstName: username,
      lastName: '',
      role: 'reader',
      imageUrl: '',
    }

    const created = await apiPost<User>('/users', payload)
    const createdId =
      typeof created.id === 'string'
        ? created.id.trim()
        : created.id != null
          ? String(created.id).trim()
          : ''
    if (!createdId) {
      return { ok: false, error: 'Invalid response from server' }
    }
    if (!isUserRole(created.role)) {
      return { ok: false, error: 'Invalid role returned by server' }
    }

    const registered = readRegistered()
    const stored: StoredUser = {
      id: createdId,
      username: created.username,
      password,
      email: created.email,
      firstName: created.firstName,
      lastName: created.lastName,
      role: created.role,
    }
    writeRegistered([...registered, stored])

    const displayName = [stored.firstName, stored.lastName]
      .filter(Boolean)
      .join(' ')
      .trim()

    const session: MockAuthSession = {
      username: stored.username,
      email: stored.email,
      displayName: displayName || stored.username,
      role: created.role,
      apiUserId: createdId,
    }
    setSession(session)
    return { ok: true, session }
  } catch (e) {
    const msg =
      e instanceof ApiError
        ? e.message
        : 'Could not reach the API. Start json-server (e.g. npm run api or npm run dev:full).'
    return { ok: false, error: msg }
  }
}

export function logout() {
  clearSession()
}
