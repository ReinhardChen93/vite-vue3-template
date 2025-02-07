import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// vite 默认只会编译，不会检测ts
export default defineConfig({
  plugins: [vue()]
})
