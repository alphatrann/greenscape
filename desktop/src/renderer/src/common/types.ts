export interface SuccessApiResponse<T> {
  data: T
}

export interface ErrorApiResponse {
  error: string
}

export type ApiResponse<T> = (SuccessApiResponse<T> | ErrorApiResponse) & {
  status: number
}

export type SortOrder = 'asc' | 'desc'
