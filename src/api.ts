import axios from 'axios'
import { LoginForm } from './types';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const api = {
  article: {
    deleteAll: () => http.delete('article/all'),
    getAll: () => http.get('/article/all'),
    getSingle: (id: string) => http.get('article/' + id),
    post: (data: any, token: string) => http.post(
      '/article',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    ),
  },

  auth: {
    login: (data: LoginForm) => http.post('/auth/s1gn1n', data),
    checkToken: () => http.get('/check-token', {})
  }
};

export default api;
