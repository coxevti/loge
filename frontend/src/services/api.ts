import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3100',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@Loge:token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default api;
