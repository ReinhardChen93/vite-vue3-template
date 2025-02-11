import { createRouter, createWebHistory } from "vue-router"

// const getRouters = () => {
//   const files = import.meta.glob("../views/*.vue")
//   return Object.entries(files).map(([file, module]) => {
//     const name = file.match(/\.\.\/views\/([^/]+?)\.vue/)?.[1]
//     return {
//       path: "/" + name,
//       component: module
//     }
//   })
// }

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/home.vue")
    },
    {
      path: "/about",
      component: () => import("../views/about.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue")
    }
  ]
  // getRouters() // 函数式
})
