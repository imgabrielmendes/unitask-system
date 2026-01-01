// src\services\teamService.js
import api from '../axios.js'


export const getTeams = () => api.get('/teams')
export const getteams = getTeams
export const getTeam = (id) => api.get(`/team/${id}`)
export const createTeam = (data) => api.post('/team', data)
export const updateTeam = (id, data) => api.put(`/team/${id}`, data)
export const deleteTeam = (id) => api.delete(`/team/${id}`)