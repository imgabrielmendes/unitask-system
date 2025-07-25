import { createRouter, createWebHistory } from 'vue-router'

// Defina algumas rotas básicas para teste
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue') // cria o arquivo Home.vue em src/views/
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
