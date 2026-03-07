import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.css'
import './assets/main.css'

import './echo.js'; 

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')