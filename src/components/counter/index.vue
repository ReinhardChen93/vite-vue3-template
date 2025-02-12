<template>
  <div flex justify-cente items-center>
    <button @click="handleClick">计数器</button>
    <ul>
      <li>{{ store.count }}</li>
      <li>{{ store.doubleCount }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter"
const store = useCounterStore()
const handleClick = () => {
  store.changeCount(5).then((res: number | void) => {
    console.log("res", res)
  })
}
</script>
<style lang="sass"></style>
