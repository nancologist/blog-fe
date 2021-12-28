import axios from 'axios'
import { LoginForm } from '../types';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const api = {
  article: {
    deleteAll: () => http.delete('article/all'), // TODO: Remove before MVP release
    getAll: () => http.get('/article/all'),
    getSingle: (id: string) => http.get('article/' + id)
  },

  auth: {
    login: (data: LoginForm) => http.post('/auth/s1gn1n', data)
  }
};

export default api;
