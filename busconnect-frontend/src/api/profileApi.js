// src/api/profileApi.js
import axiosClient from './axiosClient';

const profileApi = {
  updateSelf: (data) => axiosClient.put('/me', data),
  deleteSelf: () => axiosClient.delete('/me'),
};

export default profileApi;
