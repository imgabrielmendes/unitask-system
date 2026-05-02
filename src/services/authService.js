// src\services\authService.js
import api from '@/axios';

export async function login(email, password) {

    const response = await api.post('/login', {
    email: email.value,
    password: password.value
    });

    const payload = response?.data || {};
    // Backward compatibility: legacy backend may return [token, statusCode]
    const token = Array.isArray(payload) ? payload[0] : payload.token;
    localStorage.setItem('token', token);

    // Preferred login payload
    const user = Array.isArray(payload) ? null : (payload.user || null);
    const teams = Array.isArray(payload?.teams) ? payload.teams : [];
    const tasks = Array.isArray(payload?.tasks) ? payload.tasks : [];

    sessionStorage.setItem('home_data', JSON.stringify({ user, teams, tasks }));
    if (user) {
      sessionStorage.setItem('home_user', JSON.stringify(user));
    }

    return payload;

}

export async function register(name, email, password) {
  const response = await api.post('/register', {
    name: name.value,
    email: email.value,
    password: password.value
  });
  return response.data;
}

export function logout() {
  // Remove o token do localStorage
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  // Verifica se existe um token no localStorage
  return !!localStorage.getItem('token');
}
