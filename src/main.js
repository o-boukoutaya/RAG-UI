// src/main.js
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { startSSE } from './boot/sse'  // si tu l’utilises
import { useSSE } from './composables/useSSE'  // si tu l’utilises

// Point d’entrée :
createApp(App).use(router).use(createPinia()).mount('#app')



// const app = createApp(App)
// app.use(createPinia())
// app.use(router)            // ⬅️ indispensable
// app.mount('#app')

startSSE?.()               // SSE global si présent
useSSE?.()               // SSE test
