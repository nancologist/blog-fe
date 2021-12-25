import axios from 'axios'
const { REACT_APP_API_URL } = process.env

const http = axios.create({
  baseURL: REACT_APP_API_URL
})

const api = {
  article: {
    deleteAll: () => http.delete('article/all'),
    getAll: () => http.get('/article/all'),
    getSingle: (id: string) => http.get('article/' + id),
    post: (data: any) => http.post('/article', data),
  }
};

export default api;
