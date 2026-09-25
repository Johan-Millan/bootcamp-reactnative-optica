import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function DetailScreen({ route }: any) {
  const producto = route?.params?.producto;

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <Text style={styles.nombre}>{producto?.nombre ?? 'Producto'}</Text>
        <Text style={styles.precio}>${producto?.precio?.toFixed(2) ?? '0.00'}</Text>
        <Text style={styles.stock}>Stock disponible: {producto?.stock ?? 0}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  nombre: { fontSize: 22, fontWeight: '700', color: '#1f2937' },
  precio: { fontSize: 18, color: '#374151', marginTop: 8 },
  stock: { fontSize: 14, color: '#6b7280', marginTop: 4 },
});