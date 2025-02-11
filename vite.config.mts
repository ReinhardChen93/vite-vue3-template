/// <reference types="vitest" />
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite" // API自动导入
import path from "path"
import vueJsx from "@vitejs/plugin-vue-jsx" // 支持tsx语法
import mockServer from "vite-plugin-mock-server"
// vite 默认只会编译，不会检测ts
// 改用异步方式配置
export default defineConfig(async () => {
  const { default: UnoCSS } = await import("unocss/vite")
  const { presetUno, presetAttributify, presetIcons } = await import("unocss")

  return {
    base: "./",
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            extraProperties: {
              display: "inline-flex",
              width: "2em",
              height: "2em",
              "vertical-aling": "middle"
            }
          })
        ]
      }),
      AutoImport({
        imports: ["vue", "vue-router"]
      }),
      mockServer({
        logLevel: "info",
        mockRootDir: "./mock",
        urlPrefixes: ["/api/"],
        printStartupLog: true,
        mockJsSuffix: ".mock.js",
        mockTsSuffix: ".ts",
        noHandlerResponse404: true
      })
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
    },
    server: {
      port: 5173,
      host: true,
      cors: true
    },
    test: {
      globals: true,
      environment: "happy-dom",
      transformMode: { web: ["/.tsx$/"] }
    }
  }
})
// eslint 代码校验 prettier 风格校验 editconfig 编译器配置
// eslint vscode perttier vscode editconfig for vscode
// 默认格式化
// 配合git hook 实现代码提交前 校验
// husky
