// client/src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // All requests will be prefixed with /api
  withCredentials: true, // Include credentials (e.g., cookies) if needed
});

export default axiosInstance;
