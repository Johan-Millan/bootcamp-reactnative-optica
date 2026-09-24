import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const productos = [
  {
    nombre: 'Ray-Ban Aviator RB3025',
    categoria: 'Monofocal',
    precio: 350000,
  },
  {
    nombre: 'Oakley Holbrook',
    categoria: 'Bifocal',
    precio: 420000,
  },
  {
    nombre: 'Vulk Progresivo Transitions',
    categoria: 'Progresivo',
    precio: 610000,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Bienvenido a Óptica Visión 👓
      </Text>

      <Text style={styles.subtitle}>
        Productos ópticos disponibles
      </Text>

      {productos.map((producto) => (
        <View key={producto.nombre} style={styles.card}>
          <Text style={styles.productName}>
            {producto.nombre}
          </Text>

          <Text>
            Categoría: {producto.categoria}
          </Text>

          <Text style={styles.price}>
            ${producto.precio.toLocaleString('es-CO')}
          </Text>
        </View>
      ))}

      <Button
        title="Ver mi perfil"
        onPress={() => navigation.navigate('Profile' as never)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f7fa',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 20,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
});