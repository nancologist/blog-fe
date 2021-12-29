import axios from 'axios'

const getToken = () => localStorage.getItem('authToken')

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: 'Bearer ' + getToken()
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