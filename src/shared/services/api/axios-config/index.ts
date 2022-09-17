import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  headers: { 'Content-Type': 'application/json' },

  timeout: 10000,
});

api.interceptors.response.use(
  response => responseInterceptor(response),
  error => errorInterceptor(error)
);

export { api };
