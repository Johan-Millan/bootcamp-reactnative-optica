import React, { useCallback } from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import { Glasses } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

export function FavoritesScreen(): React.JSX.Element {
  const favoriteItems = MOCK_ITEMS.slice(0, 3);

  const handleItemPress = useCallback(
    (item: Glasses): void => {
      console.log('Favorito:', item.name);
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Mis favoritos
        </Text>

        <Text style={styles.subtitle}>
          Gafas que has guardado
        </Text>
      </View>

      <FlatList
        data={favoriteItems}
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
});