import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/typeset.css'
import { useTheme } from './composables/useTheme'

import { vReveal } from './directives/vReveal'

useTheme().initTheme()

const app = createApp(App)
app.directive('reveal', vReveal)
app.use(router)
app.mount('#app')
