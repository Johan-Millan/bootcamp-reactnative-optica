import axios from 'axios';
import { tokenService } from './tokenService';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use(async (config) => {
  const token = await tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});