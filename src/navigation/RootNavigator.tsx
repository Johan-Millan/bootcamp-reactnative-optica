import React from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useAuthStore } from '../stores/authStore';

export default function RootNavigator() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  return isAuthenticated ? (
    <AppNavigator />
  ) : (
    <AuthNavigator />
  );
}