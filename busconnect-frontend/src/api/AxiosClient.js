// src/api/AxiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:9000/api', // Adjust for your Laravel backend
});

// Attach token from localStorage to every request
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient; // <-- lowercase, same as variable name
