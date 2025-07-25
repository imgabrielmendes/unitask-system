// src\services\taskService.js
import api from '../axios.js'


export const gettarefas = () => api.get('/tarefas')
export const getTask = (id) => api.get(`/tarefas/${id}`)
export const createTask = (data) => api.post('/tarefas', data)
export const updateTask = (id, data) => api.put(`/tarefas/${id}`, data)
export const deleteTask = (id) => api.delete(`/tarefas/${id}`)