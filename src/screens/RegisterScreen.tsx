import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormField from '../components/FormField';
import {
  registerSchema,
  RegisterForm,
} from '../schemas/authSchema';
import { useAuthStore } from '../stores/authStore';

export default function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);

  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');

      await register(
        data.username,
        data.email,
        data.password
      );
    } catch {
      setError('No fue posible crear la cuenta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Crear cuenta
      </Text>

      <Controller
        control={control}
        name="username"
        render={({ field, fieldState }) => (
          <FormField
            label="Usuario"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Nombre de usuario"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <FormField
            label="Correo"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="correo@ejemplo.com"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <FormField
            label="Contraseña"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Contraseña"
            secureTextEntry
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <FormField
            label="Confirmar contraseña"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Repite tu contraseña"
            secureTextEntry
            error={fieldState.error?.message}
          />
        )}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Button
        title={loading ? 'Creando...' : 'Crear cuenta'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  error: {
    color: '#d00',
    marginBottom: 15,
    textAlign: 'center',
  },
});