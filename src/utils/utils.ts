import axios from "axios"

// 定义一个通用的响应数据类型
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status?: number
}

export class RequestError extends Error {
  constructor(
    public code: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = "RequestError"
  }
}

export const isRequestCanceled = (error: unknown): boolean => {
  return axios.isCancel(error)
}
