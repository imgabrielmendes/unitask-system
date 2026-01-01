// src\services\authService.js
import api from '@/axios';

export async function login(email, password) {

    const response = await api.post('/login', {
    email: email.value,
    password: password.value
    });

    const token = response.data.token;
    localStorage.setItem('token', token);

    console.log('TOKEN:', response.data.token);

}
