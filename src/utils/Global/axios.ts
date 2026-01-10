// src/utils/Global/axios.ts
import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

// Interceptor para agregar configuraciones a las peticiones
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar tokens u otras configuraciones
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores en respuestas
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Manejo personalizado de errores
    if (error.response?.status === 401) {
      console.error('No autorizado');
      // Aquí puedes redirigir al login si es necesario
      // window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      console.error('Acceso prohibido');
    }

    if (error.response?.status === 500) {
      console.error('Error del servidor');
    }

    return Promise.reject(error);
  }
);

export default api;


