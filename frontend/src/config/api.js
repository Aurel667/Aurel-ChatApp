import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api` || 'http://localhost:5000/api',
  withCredentials: true
});

export default apiClient;