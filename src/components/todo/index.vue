<template>
  <div>
    <h1>
      <div class="i-ep-basketball"></div>
      UnoCss
    </h1>
    <div flex class="flex-center">
      <input v-model="todo" type="text" />
      <input type="button" value="提交" @click="addTodo" />
    </div>

    <TodoList :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import TodoList from "./todo-list"

const todo = ref<string>("")
const todos = ref<string[]>([])

const addTodo = () => {
  if (!todo.value) return
  todos.value.push(todo.value)
}
</script>

<style scoped></style>
