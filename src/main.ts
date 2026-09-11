import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/typeset.css'
import { useTheme } from './composables/useTheme'

useTheme().initTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
