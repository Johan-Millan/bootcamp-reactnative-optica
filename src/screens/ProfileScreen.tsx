import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAuthStore } from '../stores/authStore';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mi perfil 👤
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <Text style={styles.value}>
          {user?.username}
        </Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.value}>
          {user?.email}
        </Text>

        <Text style={styles.label}>
          Cliente de Óptica Visión
        </Text>

        <Text style={styles.value}>
          Acceso al catálogo de productos ópticos
        </Text>
      </View>

      <Button
        title="Cerrar sesión"
        onPress={logout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  value: {
    fontSize: 17,
    marginTop: 4,
  },
});