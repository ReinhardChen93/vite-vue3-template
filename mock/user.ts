import type { MockHandler } from "vite-plugin-mock-server"

const mockHandlers: MockHandler[] = [
  {
    pattern: "/api/login",
    method: "POST",
    handle: (req, res) => {
      res.setHeader("Content-Type", "application/json")

      let bodyString = ""

      // 接收数据
      req.on("data", (chunk: string) => {
        bodyString += chunk
      })

      // 数据接收完成后处理
      req.on("end", () => {
        try {
          const body = JSON.parse(bodyString)
          console.log("收到登录请求：", {
            方法: req.method,
            路径: req.url,
            请求体: body
          })

          res.end(
            JSON.stringify({
              code: 200,
              msg: "登录成功",
              data: {
                token: "Bearer Token",
                id: 1,
                username: body.username,
                age: 18
              }
            })
          )
        } catch (error) {
          console.error("解析请求体失败：", error)
          res.statusCode = 400
          res.end(
            JSON.stringify({
              code: 400,
              msg: "请求体格式错误",
              data: null
            })
          )
        }
      })

      // 处理错误
      req.on("error", (error) => {
        console.error("请求出错：", error)
        res.statusCode = 500
        res.end(
          JSON.stringify({
            code: 500,
            msg: "服务器内部错误",
            data: null
          })
        )
      })
    }
  },
  {
    pattern: "/api/user",
    method: "GET",
    handle: (req, res) => {
      console.log("收到用户信息请求：", req.method, req.url)
      res.setHeader("Content-Type", "application/json")
      res.end(
        JSON.stringify({
          code: 200,
          msg: "获取用户信息成功",
          data: {
            token: "Bearer Token",
            id: 1,
            username: "admin",
            age: 18
          }
        })
      )
    }
  }
]

export default mockHandlers
