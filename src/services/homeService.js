import api from '../axios.js'

export const getAllTask = (id) => api.get(`/home`)
