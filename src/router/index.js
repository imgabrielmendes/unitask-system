import { createRouter, createWebHistory } from 'vue-router'

// src/pages/HomePage.vue
import HomePage from '@/pages/HomePage.vue'
// src/layouts/DefaultLayout.vue
import DefaultLayout from '@/layouts/DefaultLayout.vue'

//src\layouts\LoginRegisterLayoult.vue
import LoginRegisterPage from '../pages/LoginRegisterPage.vue'
import LoginRegisterLayoult from '@/layouts/LoginRegisterLayoult.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: HomePage
      }
    ]
  },

  {
    path: '/Home',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage
      },
      {
        path: 'user',
        name: 'Profile',
        component: HomePage
      }
    ]
  },

  {
    path: '/login',
    component: LoginRegisterLayoult,
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginRegisterPage
      }
    ]
  },

  {
    path: '/register',
    component: LoginRegisterLayoult,
  }
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
