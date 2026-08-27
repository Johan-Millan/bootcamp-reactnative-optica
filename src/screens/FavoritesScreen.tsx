import React from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ItemCard } from '../components/ItemCard';
import { Glasses } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import { useSavedStore } from '../stores/savedStore';

export function FavoritesScreen(): React.JSX.Element {
  const savedItems = useSavedStore((state) => state.savedItems);

  const handleItemPress = (item: Glasses): void => {
    console.log('Gafa guardada:', item.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis favoritos</Text>

        <Text style={styles.subtitle}>
          Gafas que has guardado
        </Text>
      </View>

      {savedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🤓</Text>

          <Text style={styles.emptyTitle}>
            No tienes gafas guardadas
          </Text>

          <Text style={styles.emptyText}>
            Ve al catálogo y guarda las gafas que más te gusten.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedItems}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={handleItemPress}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },

  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  subtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  list: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  separator: {
    height: SPACING.md,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: SPACING.md,
  },

  emptyTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.text,
    textAlign: 'center',
  },

  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});