// // GET 请求
// const getUser = async (id: number) => {
//   try {
//     const response = await http.get<UserInfo>(`/user/${id}`);
//     return response.data;
//   } catch (error) {
//     if (error instanceof RequestError) {
//       console.error(`Error ${error.code}: ${error.message}`);
//     }
//     throw error;
//   }
// };

// // POST 请求
// const createUser = async (userData: Partial<UserInfo>) => {
//   return http.post<UserInfo>('/user', userData, {
//     showLoading: true,
//     retry: 3
//   });
// };

import axios, {
  AxiosInstance,
  CancelTokenSource,
  InternalAxiosRequestConfig
} from "axios"

import type {
  RequestConfig,
  ResponseData,
  RequestInterceptors
} from "./types.js"

import { HTTP_STATUS, ERROR_MESSAGES } from "./constants.js"

import { RequestError, isRequestCanceled } from "./utils.js"

class HttpRequest {
  private instance: AxiosInstance
  private cancelTokenSources: Map<string, CancelTokenSource>
  private interceptors?: RequestInterceptors
  private loadingCount: number

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.cancelTokenSources = new Map()
    this.loadingCount = 0
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 处理 loading 状态
        const customConfig = config as unknown as RequestConfig
        if (customConfig.showLoading !== false) {
          this.handleLoading(true)
        }

        // 处理取消令牌
        const requestKey = this.getRequestKey(config)
        if (this.cancelTokenSources.has(requestKey)) {
          this.cancelRequest(requestKey)
        }
        const source = axios.CancelToken.source()
        config.cancelToken = source.token
        this.cancelTokenSources.set(requestKey, source)

        // 添加认证信息
        const token = localStorage.getItem("token")
        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`)
        }

        // 自定义请求拦截器
        if (this.interceptors?.requestInterceptor) {
          return this.interceptors.requestInterceptor(config)
        }

        return config
      },
      (error) => {
        if (this.interceptors?.requestInterceptorCatch) {
          return this.interceptors.requestInterceptorCatch(error)
        }
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // 清理取消令牌
        const config = response.config as RequestConfig
        const requestKey = this.getRequestKey(config)
        this.cancelTokenSources.delete(requestKey)

        // 处理 loading 状态
        if (config.showLoading !== false) {
          this.handleLoading(false)
        }

        // 自定义响应拦截器
        if (this.interceptors?.responseInterceptor) {
          response = this.interceptors.responseInterceptor(response)
        }

        const { code, msg, data } = response.data as ResponseData

        if (code !== HTTP_STATUS.SUCCESS) {
          if (config.errorHandle !== false) {
            this.handleError(code, msg)
          }
          throw new RequestError(code, msg || "请求失败", data)
        }

        return response.data
      },
      (error) => {
        // 处理 loading 状态
        this.handleLoading(false)

        if (this.interceptors?.responseInterceptorCatch) {
          return this.interceptors.responseInterceptorCatch(error)
        }

        if (!isRequestCanceled(error)) {
          this.handleError(
            error.response?.status,
            error.response?.data?.msg || error.message
          )
        }

        return Promise.reject(error)
      }
    )
  }

  private handleLoading(isShow: boolean): void {
    if (isShow) {
      this.loadingCount++
    } else {
      this.loadingCount = Math.max(0, this.loadingCount - 1)
    }

    // 可以在这里触发全局 loading 状态
    if (this.loadingCount > 0) {
      // showGlobalLoading()
    } else {
      // hideGlobalLoading()
    }
  }

  private handleError(code: number, message: string): void {
    switch (code) {
      case HTTP_STATUS.UNAUTHORIZED:
        // 处理未授权情况，例如跳转到登录页
        break
      case HTTP_STATUS.FORBIDDEN:
        // 处理禁止访问情况
        break
      default:
        // 显示错误提示
        console.error(message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  private getRequestKey(config: RequestConfig): string {
    const { method, url, params, data } = config
    return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`
  }

  public setInterceptors(interceptors: RequestInterceptors): void {
    this.interceptors = interceptors
  }

  public cancelRequest(requestKey?: string): void {
    if (requestKey) {
      const source = this.cancelTokenSources.get(requestKey)
      if (source) {
        source.cancel("Request canceled")
        this.cancelTokenSources.delete(requestKey)
      }
    } else {
      this.cancelTokenSources.forEach((source) => {
        source.cancel("Request canceled")
      })
      this.cancelTokenSources.clear()
    }
  }

  public async request<T = unknown>(
    config: RequestConfig
  ): Promise<ResponseData<T>> {
    try {
      const response = await this.instance.request<unknown, ResponseData<T>>(
        config
      )
      return response
    } catch (error) {
      if (config.retry && config.retry > 0) {
        return this.request({
          ...config,
          retry: config.retry - 1
        })
      }
      throw error
    }
  }

  public get<T = unknown>(
    url: string,
    config?: Omit<RequestConfig, "url" | "method">
  ): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: "get" })
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<RequestConfig, "url" | "method" | "data">
  ): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: "post", data })
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<RequestConfig, "url" | "method" | "data">
  ): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: "put", data })
  }

  public delete<T = unknown>(
    url: string,
    config?: Omit<RequestConfig, "url" | "method">
  ): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: "delete" })
  }
}

// 创建默认实例
const defaultConfig: RequestConfig = {
  baseURL: "/", //import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
}
export default new HttpRequest(defaultConfig)
