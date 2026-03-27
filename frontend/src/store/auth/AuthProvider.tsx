import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import type { AuthSession, LoginRequest, SignupRequest } from '../../types/auth'
import { clearStoredSession, getStoredSession, setStoredSession } from './auth-storage'
import { login, logout, signup } from '../../services/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setSession(getStoredSession())
    setIsInitialized(true)

    const handleAuthExpired = () => {
      clearStoredSession()
      setSession(null)
    }

    window.addEventListener('auth:expired', handleAuthExpired)
    return () => window.removeEventListener('auth:expired', handleAuthExpired)
  }, [])

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isInitialized,
      async loginAction(payload: LoginRequest) {
        const result = await login(payload)
        const nextSession: AuthSession = {
          userId: result.id,
          nickname: result.nickname,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        }
        setStoredSession(nextSession)
        setSession(nextSession)
      },
      async signupAction(payload: SignupRequest) {
        await signup(payload)
      },
      async logoutAction() {
        try {
          if (getStoredSession()) {
            await logout()
          }
        } finally {
          clearStoredSession()
          setSession(null)
        }
      },
      clearSession() {
        clearStoredSession()
        setSession(null)
      },
    }),
    [isInitialized, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
