import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  timeout: 10000,
});

api.interceptors.response.use(
  response => responseInterceptor(response),
  error => errorInterceptor(error)
);

export { api };
