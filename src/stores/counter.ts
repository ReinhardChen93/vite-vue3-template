import { defineStore } from "pinia"
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  const doubleCount = computed(() => {
    return count.value * 2
  })
  const changeCount = (payload: number) => {
    return new Promise<number | void>((resolve, reject) => {
      try {
        setTimeout(() => {
          count.value += payload
          resolve()
          // return resolve(count.value)
        }, 1000)
      } catch (error) {
        reject(error)
      }
    })
  }
  return { count, doubleCount, changeCount }
})
