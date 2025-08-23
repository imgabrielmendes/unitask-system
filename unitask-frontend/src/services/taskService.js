// src\services\taskService.js
import api from '../axios.js'


/**
 * 
 * @returns Retornar as tarefas do usuário
 */
export const gettarefas = () => api.get('/task')

/**
 * 
 * @returns 
 */
export const getMyTasks = () => api.get('/tasks/me')

/**
 * 
 * @param {int} id 
 * @returns Retornar as informações de uma tarefa ao usuário
 */
export const getTask = (id) => api.get(`/task/${id}`)

/**
 * 
 * @param {Array} data 
 * @returns 
 */
export const createTask = (data) => api.post('/task', data)

export const updateTask = (id, data) => api.put(`/task/${id}`, data)
export const deleteTask = (id) => api.delete(`/task/${id}`)

/**
 * 
 * @returns Retornar os membros atrelado as tasks que o usuário está envolvido
 */
export const getAllMembers = () => api.get('/members')
