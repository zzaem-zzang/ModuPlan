import type { AuthSession } from '../../types/auth'

const AUTH_STORAGE_KEY = 'moduplan.auth'

export function getStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function setStoredSession(session: AuthSession) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function clearStoredSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
