import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
})
api.interceptors.response.use(
  r => r,
  e => Promise.reject(new Error(e.response?.data?.message || e.message || 'Request failed'))
)

export const contactAPI  = { send: (d) => api.post('/contact', d) }
export const projectsAPI = { getAll: () => api.get('/projects'), getFeatured: () => api.get('/projects/featured') }
export default api
