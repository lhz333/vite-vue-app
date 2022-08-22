import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import { createPinia } from 'pinia'
import router from '@/router/index'
import '@/assets/styles/reset.scss'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
