import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router/index"
import "virtual:uno.css"
import "@iconify-json/ep"
createApp(App).use(router).use(createPinia()).mount("#app")
