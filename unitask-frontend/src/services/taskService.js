// src\services\taskService.js
import api from '../axios.js'


export const gettarefas = () => api.get('/task')
export const getTask = (id) => api.get(`/task/${id}`)
export const createTask = (data) => api.post('/task', data)
export const updateTask = (id, data) => api.put(`/task/${id}`, data)
export const deleteTask = (id) => api.delete(`/task/${id}`)

export const getAllMembers = () => api.get(`/members/${id}`)