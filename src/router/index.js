import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

//src\layouts\LoginRegisterLayoult.vue
import LoginRegisterPage from '../pages/LoginRegisterPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ForgotPasswordPage from '../pages/ForgotPasswordPage.vue'
import LoginRegisterLayoult from '@/layouts/LoginRegisterLayoult.vue'

import DesignSystemPage from '@/pages/DesignSystemPage.vue'
import TeamsPage from '@/pages/TeamsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import ApiDocsPage from '@/pages/ApiDocsPage.vue'
import TeamPage from '@/pages/TeamPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'

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
    path: '/home',
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
    path: '/projects',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Projects',
        component: ProjectsPage
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
    path: '/team/:slug',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Team',
        component: TeamPage
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
    path: '/api-docs',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'ApiDocs',
        component: ApiDocsPage
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
const INVALID_TOKENS = ['undefined', 'null', '', null]

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')

  // Clean up corrupted tokens
  if (INVALID_TOKENS.includes(token)) {
    localStorage.removeItem('token')
    token = null
  }

  const publicPages = ['/login', '/register', '/forgot-password']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !token) {
    return next('/login')
  }

  if (token && publicPages.includes(to.path)) {
    return next('/home')
  }

  next()
})

export default router
