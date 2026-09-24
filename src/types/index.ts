export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}