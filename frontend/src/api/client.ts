import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { clearStoredSession, getStoredSession, setStoredSession } from '../store/auth/auth-storage'
import type { ApiErrorResponse, ApiResponse } from '../types/api'
import type { ReissueResponse } from '../types/auth'

type RetriableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean
}

export class ApiRequestError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

function rejectWithApiError(error: AxiosError<ApiErrorResponse>) {
  const status = error.response?.status ?? 500
  const message = error.response?.data?.message ?? error.message ?? '요청 처리 중 오류가 발생했습니다.'
  return Promise.reject(new ApiRequestError(message, status))
}

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken() {
  const currentSession = getStoredSession()

  if (!currentSession?.refreshToken) {
    clearStoredSession()
    return null
  }

  try {
    const response = await refreshClient.post<ApiResponse<ReissueResponse>>('/auth/reissue', {
      refreshToken: currentSession.refreshToken,
    })

    const nextTokens = response.data.data
    const nextSession = {
      ...currentSession,
      accessToken: nextTokens.accessToken,
      refreshToken: nextTokens.refreshToken,
    }

    setStoredSession(nextSession)
    return nextSession.accessToken
  } catch {
    clearStoredSession()
    window.dispatchEvent(new Event('auth:expired'))
    window.location.assign('/login')
    return null
  }
}

api.interceptors.request.use((config) => {
  const currentSession = getStoredSession()

  if (currentSession?.accessToken) {
    config.headers.Authorization = `Bearer ${currentSession.accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const request = error.config as RetriableRequest | undefined
    const status = error.response?.status
    const path = request?.url ?? ''
    const isAuthPath =
      path.includes('/auth/login') || path.includes('/auth/signup') || path.includes('/auth/reissue')

    if (status === 401 && request && !request._retry && !isAuthPath && getStoredSession()?.refreshToken) {
      request._retry = true

      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null
      })

      const nextToken = await refreshPromise

      if (nextToken) {
        request.headers.Authorization = `Bearer ${nextToken}`
        return api(request)
      }
    }

    return rejectWithApiError(error)
  },
)
