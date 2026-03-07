// src\services\authService.js
import api from '@/axios';

export async function login(email, password) {

    const response = await api.post('/login', {
    email: email.value,
    password: password.value
    });

    // Backend returns [token, statusCode] array
    const token = Array.isArray(response.data) ? response.data[0] : response.data.token;
    localStorage.setItem('token', token);

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
