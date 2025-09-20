// src/api/bookingApi.js
import axiosClient from './AxiosClient';

const bookingApi = {
  getAll: () => axiosClient.get('/bookings'),
  get: id => axiosClient.get(`/bookings/${id}`),
  create: data => axiosClient.post('/bookings', data),
  update: (id, data) => axiosClient.put(`/bookings/${id}`, data),
  delete: id => axiosClient.delete(`/bookings/${id}`),
};

export default bookingApi;
