<template>
  <div>login</div>
</template>
<script setup lang="ts">
import { onMounted } from "vue"
import { login } from "@/api/user"
const fetchData = async () => {
  const response = await login({ username: "reinhard", password: "12304" })
  console.log("Login response:", response) // 添加日志以查看响应
  return response
}
onMounted(async () => {
  try {
    await fetchData()
  } catch (error) {
    console.error("Login error:", error) // 添加错误日志
  }
})
</script>
<style></style>
