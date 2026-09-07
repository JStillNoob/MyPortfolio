import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { useTheme } from './composables/useTheme'

useTheme().initTheme()

createApp(App).mount('#app')
