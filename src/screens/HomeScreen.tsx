import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

const PRODUCTOS_INICIALES: Producto[] = [
  { id: '1', nombre: 'Montura Ray-Ban Classic', precio: 89.99, stock: 12 },
  { id: '2', nombre: 'Lentes de contacto Acuvue', precio: 24.5, stock: 30 },
  { id: '3', nombre: 'Gafas de sol Polarizadas', precio: 45.0, stock: 8 },
  { id: '4', nombre: 'Montura infantil Flex', precio: 39.99, stock: 5 },
];

const STOCK_MAXIMO_TOTAL = 100;

export default function HomeScreen({ navigation }: any) {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIALES);

  // Un Animated.Value por item, para la entrada en cascada
  const animatedValues = useRef<Record<string, Animated.Value>>({}).current;

  const getAnimatedValue = (id: string) => {
    if (!animatedValues[id]) {
      animatedValues[id] = new Animated.Value(0);
    }
    return animatedValues[id];
  };

  useEffect(() => {
    const animaciones = productos.map((p) =>
      Animated.timing(getAnimatedValue(p.id), {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    );
    Animated.stagger(80, animaciones).start();
  }, []);

  const stockDisponible = productos.reduce((acc, p) => acc + p.stock, 0);
  const porcentajeStock = Math.min(100, (stockDisponible / STOCK_MAXIMO_TOTAL) * 100);

  const agregarProducto = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nuevo: Producto = {
      id: Date.now().toString(),
      nombre: 'Nuevo producto',
      precio: 19.99,
      stock: 10,
    };
    getAnimatedValue(nuevo.id).setValue(0);
    setProductos((prev) => [nuevo, ...prev]);
    Animated.timing(getAnimatedValue(nuevo.id), {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const eliminarProducto = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setProductos((prev) => prev.filter((p) => p.id !== id));
    delete animatedValues[id];
  };

  const renderItem = ({ item }: { item: Producto }) => {
    const anim = getAnimatedValue(item.id);
    const opacity = anim;
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    });

    return (
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <Pressable onLongPress={() => eliminarProducto(item.id)}>
          <AnimatedCard
            producto={item}
            onPress={() => navigation.navigate('Detail', { producto: item })}
          />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Óptica — Inventario</Text>
      <ProgressBar porcentaje={porcentajeStock} />
      <Pressable style={styles.boton} onPress={agregarProducto}>
        <Text style={styles.botonTexto}>+ Agregar producto</Text>
      </Pressable>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', paddingTop: 16 },
  titulo: { fontSize: 20, fontWeight: '700', marginHorizontal: 12, marginBottom: 8, color: '#1f2937' },
  boton: {
    backgroundColor: '#2563eb',
    marginHorizontal: 12,
    marginBottom: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: { color: '#fff', fontWeight: '600' },
});