import axios from 'axios';

// API de práctica (JSONPlaceholder) usada como proxy del dominio Óptica.
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
