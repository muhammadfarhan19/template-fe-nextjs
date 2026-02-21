export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
}
