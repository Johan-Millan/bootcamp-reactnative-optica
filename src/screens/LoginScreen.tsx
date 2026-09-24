import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormField from '../components/FormField';
import { loginSchema, LoginForm } from '../schemas/authSchema';
import { useAuthStore } from '../stores/authStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const [serverError, setServerError] = useState('');

  const {
    control,
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setServerError('');

      await login(data.username, data.password);
    } catch {
      setServerError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Óptica Visión 👓</Text>

      <Text style={styles.subtitle}>
        Inicia sesión para consultar tus productos ópticos
      </Text>

      <FormFieldControl
        control={control}
        name="username"
        label="Usuario"
        placeholder="Ej: emilys"
      />

      <FormFieldControl
        control={control}
        name="password"
        label="Contraseña"
        placeholder="Tu contraseña"
        secureTextEntry
      />

      {serverError ? (
        <Text style={styles.serverError}>{serverError}</Text>
      ) : null}

      <Button
        title={loading ? 'Ingresando...' : 'Iniciar sesión'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <View style={styles.space} />

      <Button
        title="Crear una cuenta"
        onPress={() => navigation.navigate('Register')}
      />

      <Text style={styles.demo}>
        Prueba: emilys / emilyspass
      </Text>
    </View>
  );
}

import { Controller, Control, FieldPath } from 'react-hook-form';

function FormFieldControl({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
}: {
  control: Control<LoginForm>;
  name: FieldPath<LoginForm>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          error={fieldState.error?.message}
        />
      )}
    />
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  serverError: {
    color: '#d00',
    marginBottom: 15,
    textAlign: 'center',
  },
  space: {
    height: 12,
  },
  demo: {
    marginTop: 25,
    textAlign: 'center',
    color: '#777',
  },
});