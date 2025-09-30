// src/api/routeApi.js
import axiosClient from './AxiosClient';

const punetoriApi = {
  getAll: () => axiosClient.get('/punetoret'),
  get: id => axiosClient.get(`/punetoret/${id}`),
  create: data => axiosClient.post('/punetoret', data),
  update: (id, data) => axiosClient.put(`/punetoret/${id}`, data),
  delete: id => axiosClient.delete(`/punetoret/${id}`),
};

export default punetoriApi;
