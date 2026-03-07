// src\axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (token === 'undefined' || token === 'null') {
    // Clean up corrupted token from a previous broken session
    localStorage.removeItem('token');
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Lazy import to avoid circular dependency
      const { default: router } = await import('./router/index.js');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
