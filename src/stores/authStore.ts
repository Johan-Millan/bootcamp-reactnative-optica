import { create } from 'zustand';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';
import { User } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,

  login: async (username, password) => {
    set({ loading: true });

    try {
      const data = await authService.login(username, password);

      await tokenService.saveTokens(
        data.accessToken,
        data.refreshToken
      );

      set({
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        accessToken: data.accessToken,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  register: async (username, email, password) => {
    set({ loading: true });

    try {
      const data = await authService.register(
        username,
        email,
        password
      );

      await tokenService.saveTokens(
        data.accessToken,
        data.refreshToken
      );

      set({
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        accessToken: data.accessToken,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    await tokenService.clearTokens();

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      loading: false,
    });
  },

  refreshTokens: async () => {
    const refreshToken = await tokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No existe refresh token');
    }

    const data = await authService.refresh(refreshToken);

    await tokenService.saveTokens(
      data.accessToken,
      data.refreshToken
    );

    set({
      accessToken: data.accessToken,
      isAuthenticated: true,
    });
  },
}));