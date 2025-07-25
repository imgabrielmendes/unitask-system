// src/store/auth.js
import { defineStore } from 'pinia'
import axios from '../axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(credentials) {
      await axios.get('/sanctum/csrf-cookie')
      const response = await axios.post('/api/login', credentials)
      this.user = response.data.user
    },
    async logout() {
      await axios.post('/api/logout')
      this.user = null
    },
    async fetchUser() {
      const res = await axios.get('/api/user')
      this.user = res.data
    }
  }
})
