import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import "virtual:uno.css"
import "@iconify-json/ep"
createApp(App).use(router).mount("#app")
