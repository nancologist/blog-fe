import axios from 'axios'
const { REACT_APP_API_URL } = process.env

const http = axios.create({
  baseURL: REACT_APP_API_URL
})

const api = {
  test: http.get('test'),
  uploadImg: http.post('up-image')
};

export default api;
