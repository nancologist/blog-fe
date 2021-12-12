import axios from 'axios'
const { REACT_APP_API_URL } = process.env

const http = axios.create({
  baseURL: REACT_APP_API_URL
})

const api = {
  test: http.get('test'),
  uploadImg: (data: any) => http.post(
    'up-image',
    data,
    {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
  )
};

export default api;
