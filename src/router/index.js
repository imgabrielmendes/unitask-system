import { createRouter, createWebHistory } from 'vue-router'

// src/pages/HomePage.vue
import HomePage from '@/pages/HomePage.vue'
// src/layouts/DefaultLayout.vue
import DefaultLayout from '@/layouts/DefaultLayout.vue'

//src\layouts\LoginRegisterLayoult.vue
import LoginRegisterPage from '../pages/LoginRegisterPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ForgotPasswordPage from '../pages/ForgotPasswordPage.vue'
import LoginRegisterLayoult from '@/layouts/LoginRegisterLayoult.vue'

// Design System Page
import DesignSystemPage from '@/pages/DesignSystemPage.vue'
// Teams Page
import TeamsPage from '@/pages/TeamsPage.vue'
// Tasks Page
import TasksPage from '@/pages/TasksPage.vue'

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
    path: '/design-system',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'DesignSystem',
        component: DesignSystemPage
      }
    ]
  },

  {
    path: '/teams',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Teams',
        component: TeamsPage
      }
    ]
  },

  {
    path: '/tasks',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Tasks',
        component: TasksPage
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
    children: [
      {
        path: '',
        name: 'Register',
        component: RegisterPage
      }
    ]
  },

  {
    path: '/forgot-password',
    component: LoginRegisterLayoult,
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        component: ForgotPasswordPage
      }
    ]
  }
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const publicPages = ['/login', '/register', '/forgot-password']
  const authRequired = !publicPages.includes(to.path)

  // Se a rota requer autenticação e não há token, redireciona para login
  if (authRequired && !token) {
    return next('/login')
  }

  // Se está autenticado e tenta acessar login/register, redireciona para home
  if (token && publicPages.includes(to.path)) {
    return next('/home')
  }

  next()
})

export default router
