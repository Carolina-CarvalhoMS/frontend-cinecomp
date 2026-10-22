import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Anexa automaticamente o token JWT caso ele exista
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@CineComp:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});