// src/api/userApi.js
import axiosClient from './AxiosClient';

const userApi = {
  // List all users (admin-only)
  getAll: () => axiosClient.get('/users'),

  // Get one user by ID
  get: id => axiosClient.get(`/users/${id}`),

  // Create new user (admin-only)
  create: data => axiosClient.post('/users', data),

  // Update existing user
  update: (id, data) => axiosClient.put(`/users/${id}`, data),

  // Delete a user
  delete: id => axiosClient.delete(`/users/${id}`),
};

export default userApi;
