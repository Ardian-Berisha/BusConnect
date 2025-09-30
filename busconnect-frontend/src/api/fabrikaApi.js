// src/api/busApi.js
import axiosClient from './AxiosClient';

const fabrikaApi = {
  getAll: () => axiosClient.get('/fabrikat'),
  get: id => axiosClient.get(`/fabrikat/${id}`),
  create: data => axiosClient.post('/fabirkat', data),
  update: (id, data) => axiosClient.put(`/fabrikat/${id}`, data),
  delete: id => axiosClient.delete(`/fabrikat/${id}`),
};

export default fabrikaApi;
