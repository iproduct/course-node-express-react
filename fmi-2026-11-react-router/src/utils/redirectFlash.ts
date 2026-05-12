import { redirect } from 'react-router'

export function redirectWithFlash(
  to: string,
  kind: 'success' | 'error',
  message: string,
) {
  const sp = new URLSearchParams()
  sp.set('flash', kind)
  sp.set('msg', message)
  const sep = to.includes('?') ? '&' : '?'
  return redirect(`${to}${sep}${sp.toString()}`)
}
