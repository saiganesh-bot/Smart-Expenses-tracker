import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[API Request] Attaching token:', `Bearer ${token.substring(0, 10)}...`);
  } else {
    console.warn('[API Request] No token found in localStorage');
  }
  return config;
}, (error) => {
  console.error('[API Request Error]', error);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  console.log(`[API Response] ${response.config.url} - Success`);
  return response;
}, (error) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error(`[API Response Error] ${error.config.url} - Status: ${status}`, data);
    
    if (status === 401) {
      console.warn('[API 401] Unauthorized - possible expired token');
    }
  } else {
    console.error('[API Network Error]', error.message);
  }
  return Promise.reject(error);
});

export default api;
