// src/api/authApi.js
import axiosClient from './AxiosClient';

const authApi = {
  register: data => axiosClient.post('/register', data),
  login: data => axiosClient.post('/login', data),
  me: () => axiosClient.get('/me'),
  logout: () => axiosClient.post('/logout'),
  refresh: () => axiosClient.post('/refresh'),
};

export default authApi;
