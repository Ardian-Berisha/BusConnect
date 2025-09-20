// src/api/profileApi.js
import axiosClient from './AxiosClient';

const profileApi = {
  updateSelf: (data) => axiosClient.put('/me', data),
  deleteSelf: () => axiosClient.delete('/me'),
};

export default profileApi;
