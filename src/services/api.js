import axios from 'axios';

// URL base onde o backend CineComp estará rodando localmente
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});