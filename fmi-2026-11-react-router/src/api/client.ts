/**
 * Browser calls use the Vite proxy at `/api` → json-server (port 3001).
 * Override with `VITE_API_BASE` if you serve the API elsewhere.
 */
export const API_BASE = (
  import.meta.env.VITE_API_BASE as string | undefined
)?.replace(/\/$/, '') ?? '/api'

async function parseMaybeJson(r: Response): Promise<unknown> {
  const text = await r.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`)
  const body = await parseMaybeJson(r)
  if (!r.ok) {
    const msg =
      typeof body === 'string'
        ? body
        : body && typeof body === 'object' && 'message' in body
          ? String((body as { message: string }).message)
          : r.statusText
    throw new ApiError(msg || 'Request failed', r.status)
  }
  return body as T
}

export async function apiPost<T>(path: string, data: unknown): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const body = await parseMaybeJson(r)
  if (!r.ok) {
    const msg =
      typeof body === 'string'
        ? body
        : body && typeof body === 'object'
          ? JSON.stringify(body)
          : r.statusText
    throw new ApiError(msg || 'Request failed', r.status)
  }
  return body as T
}

export async function apiPut<T>(path: string, data: unknown): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const body = await parseMaybeJson(r)
  if (!r.ok) {
    const msg =
      typeof body === 'string'
        ? body
        : body && typeof body === 'object'
          ? JSON.stringify(body)
          : r.statusText
    throw new ApiError(msg || 'Request failed', r.status)
  }
  return body as T
}

export async function apiDelete(path: string): Promise<void> {
  const r = await fetch(`${API_BASE}${path}`, { method: 'DELETE' })
  if (!r.ok) {
    const body = await parseMaybeJson(r)
    const msg =
      typeof body === 'string'
        ? body
        : body && typeof body === 'object'
          ? JSON.stringify(body)
          : r.statusText
    throw new ApiError(msg || 'Request failed', r.status)
  }
}
