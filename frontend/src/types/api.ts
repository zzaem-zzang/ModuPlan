export type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export type ApiErrorResponse = {
  status: number
  message: string
}

export type PageResponse<T> = {
  content: T[]
  page: number
  size: number
  totalElements: number
}
