// src\services\projectService.js
import api from '../axios.js'

export const getProjects = () => api.get('/projects')
export const getprojects = getProjects
export const getProject = (id) => api.get(`/projects/${id}`)

export const createProject = (data) => api.post('/projects', data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data)
export const deleteProject = (id) => api.delete(`/projects/${id}`)