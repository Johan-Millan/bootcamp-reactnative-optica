import React from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

import { MOCK_ITEMS } from '../data/mockData';
import { HomeStackParamList } from '../navigation/HomeStack';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type DetailRouteProp = RouteProp<
  HomeStackParamList,
  'Detail'
>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();

  const { id, name } = route.params;

  const item = MOCK_ITEMS.find(
    (glasses) => glasses.id === id,
  );

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Gafa no encontrada
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: item.imageUri }}
          style={styles.image}
        />

        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.subtitle}>
          {item.subtitle}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          Marca
        </Text>

        <Text style={styles.value}>
          {item.brand}
        </Text>

        <Text style={styles.label}>
          Categoría
        </Text>

        <Text style={styles.value}>
          {item.category}
        </Text>

        <Text style={styles.label}>
          Precio
        </Text>

        <Text style={styles.price}>
          ${item.price.toLocaleString('es-CO')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },

  name: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginTop: SPACING.lg,
  },

  subtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },

  label: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },

  value: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },

  price: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.text,
  },
});