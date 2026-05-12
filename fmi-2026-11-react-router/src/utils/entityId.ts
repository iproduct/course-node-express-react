/**
 * json-server (recent versions) returns entity ids as strings; route params are strings too.
 */

export function routeEntityId(param: string | undefined): string | null {
  const s = param?.trim()
  return s && s.length > 0 ? s : null
}

/** Normalize id from session JSON (supports legacy numeric `apiUserId`). */
export function sessionEntityId(raw: unknown): string | undefined {
  if (typeof raw === 'string' && raw.trim()) return raw.trim()
  if (typeof raw === 'number' && Number.isFinite(raw)) return String(raw)
  return undefined
}
