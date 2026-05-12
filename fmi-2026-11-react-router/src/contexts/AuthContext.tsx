import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { MockAuthSession } from '../services/mockAuth'
import {
  getSession,
  login as loginService,
  logout as logoutService,
  register as registerService,
} from '../services/mockAuth'

type AuthContextValue = {
  session: MockAuthSession | null
  login: (username: string, password: string) => { ok: true } | { ok: false; error: string }
  register: (input: {
    username: string
    password: string
    email: string
  }) => Promise<{ ok: true } | { ok: false; error: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MockAuthSession | null>(() => getSession())

  const login = useCallback((username: string, password: string) => {
    const result = loginService(username, password)
    if (result.ok === true) {
      setSession(result.session)
      return { ok: true as const }
    }
    return { ok: false as const, error: result.error }
  }, [])

  const register = useCallback(
    async (input: { username: string; password: string; email: string }) => {
      const result = await registerService(input)
      if (result.ok === true) {
        setSession(result.session)
        return { ok: true as const }
      }
      return { ok: false as const, error: result.error }
    },
    [],
  )

  const logout = useCallback(() => {
    logoutService()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ session, login, register, logout }),
    [session, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
