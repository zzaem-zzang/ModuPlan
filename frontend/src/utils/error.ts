import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../types/api'

export function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message)
  }

  const axiosError = error as AxiosError<ApiErrorResponse>
  return axiosError.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.'
}
