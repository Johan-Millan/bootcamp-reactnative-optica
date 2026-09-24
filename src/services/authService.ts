import axios from 'axios';
import { AuthResponse, RefreshResponse, User } from '../types';

const AUTH_URL = 'https://dummyjson.com/auth';

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${AUTH_URL}/login`,
      {
        username,
        password,
      },
      {
        params: {
          expiresInMins: 30,
        },
      }
    );

    return response.data;
  },

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    // DummyJSON no dispone de un registro real para este ejercicio.
    // Creamos una respuesta local para permitir probar el flujo de registro.
    return {
      id: Date.now(),
      username,
      email,
      firstName: username,
      lastName: '',
      accessToken: `demo-access-${Date.now()}`,
      refreshToken: `demo-refresh-${Date.now()}`,
    };
  },

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const response = await axios.post<RefreshResponse>(
      `${AUTH_URL}/refresh`,
      {
        refreshToken,
        expiresInMins: 30,
      }
    );

    return response.data;
  },

  async getMe(accessToken: string): Promise<User> {
    const response = await axios.get<User>(`${AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },
};