import { createContext } from 'react'
import type { AuthSession, LoginRequest, SignupRequest } from '../../types/auth'

export type AuthContextValue = {
  session: AuthSession | null
  isAuthenticated: boolean
  isInitialized: boolean
  loginAction: (payload: LoginRequest) => Promise<void>
  signupAction: (payload: SignupRequest) => Promise<void>
  logoutAction: () => Promise<void>
  clearSession: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
