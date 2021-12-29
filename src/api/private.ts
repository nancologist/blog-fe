import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  return {
    ...config,
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
})

const api = {
  article: {
    post: (data: any) => http.post('/article', data),
    delete: (id: string) => http.delete('/article/' + id)
  },

  auth: {
    checkToken: () => http.get('/auth/check-token')
  }
};

export default api;