// src\services\taskService.js
import api from '../axios.js'

export const getTarefas = () => api.get('/tasks')

export const gettarefas = getTarefas

export const getTask = (id) => api.get(`/task/${id}`)

export const createTask = (data) => api.post('/tasks', data)

export const updateTask = (id, data) => api.put(`/task/${id}`, data)

export const deleteTask = (id) => api.delete(`/task/${id}`)