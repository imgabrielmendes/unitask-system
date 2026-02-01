import api from '../axios.js'

export const getHome = () => api.get('/home')
export const getHomeData = getHome
