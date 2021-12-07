import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000/'
})

const api = {
  test: http.get('test')
};

export default api;
