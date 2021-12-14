import axios from 'axios'
const { REACT_APP_API_URL } = process.env

const http = axios.create({
  baseURL: REACT_APP_API_URL
})

const api = {
  uploadImg: (data: any) => http.post(
    'image',
    data,
    {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
  )
};

export default api;
