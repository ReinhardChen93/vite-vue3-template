import request from "@/utils/HttpRequest"

const enum USERAPI_LIST {
  login = "/api/login" // 修改这里，添加 /api 前缀
}

export interface UserInfo {
  username: string
  password: string
}

export async function login(userData: Partial<UserInfo>) {
  console.log("Sending login request:", userData) // 添加请求日志
  try {
    const response = await request.post<UserInfo>(
      USERAPI_LIST.login,
      userData,
      {
        showLoading: true,
        retry: 3
      }
    )
    console.log("Login response:", response) // 添加响应日志
    return response
  } catch (error) {
    console.error("Login error:", error) // 添加错误日志
    throw error
  }
}
