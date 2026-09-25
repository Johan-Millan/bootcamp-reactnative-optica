import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  porcentaje: number; // 0 a 100 — ej. % de stock disponible de la óptica
}

export default function ProgressBar({ porcentaje }: ProgressBarProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: porcentaje,
      duration: 800,
      useNativeDriver: false, // width y backgroundColor no soportan driver nativo
    }).start();
  }, [porcentaje]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const backgroundColor = progress.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#ef4444', '#facc15', '#22c55e'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, { width, backgroundColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    marginHorizontal: 12,
    marginVertical: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
});