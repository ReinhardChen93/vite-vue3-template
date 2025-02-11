import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders
} from "axios"

export interface ResponseData<T = any> {
  code: number
  data?: T
  msg: string
}

export interface RequestConfig<T = any>
  extends Omit<AxiosRequestConfig, "headers"> {
  headers?: RawAxiosRequestHeaders
  showLoading?: boolean
  errorHandle?: boolean
  retry?: number
}

export interface RequestInterceptors {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
