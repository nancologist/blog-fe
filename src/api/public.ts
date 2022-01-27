import axios from 'axios'
import { LoginForm } from '../types';

  baseURL: process.env.REACT_APP_API_URL
export const http = axios.create({
})

const api = {
  article: {
    getAll: () => http.get('/article/all'),
    getSingle: (id: string) => http.get('article/' + id)
  },

  auth: {
    login: (data: LoginForm) => http.post('/auth/s1gn1n', data)
  }
};

export default api;
