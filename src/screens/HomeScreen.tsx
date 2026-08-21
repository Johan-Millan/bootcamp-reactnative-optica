import React, { useCallback, useMemo, useState } from 'react';

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Glasses } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import { HomeStackParamList } from '../navigation/HomeStack';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Home'
>;

export function HomeScreen({
  navigation,
}: HomeScreenProps): React.JSX.Element {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return MOCK_ITEMS;
    }

    return MOCK_ITEMS.filter((item) =>
      `${item.name} ${item.brand} ${item.category} ${item.subtitle}`
        .toLowerCase()
        .includes(searchText),
    );
  }, [search]);

  const handleItemPress = useCallback(
    (item: Glasses): void => {
      navigation.navigate('Detail', {
  id: item.id,
  name: item.name,
});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Glasses }): React.JSX.Element => (
      <ItemCard
        item={item}
        onPress={handleItemPress}
      />
    ),
    [handleItemPress],
  );

  const renderEmpty = useCallback((): React.JSX.Element => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>

        <Text style={styles.emptyTitle}>
          No encontramos gafas
        </Text>

        <Text style={styles.emptyText}>
          Intenta buscar con otro nombre, marca o categoría.
        </Text>
      </View>
    );
  }, []);

  const renderSeparator = useCallback(
    (): React.JSX.Element => (
      <View style={styles.separator} />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Óptica Visión
          </Text>

          <Text style={styles.headerSubtitle}>
            Catálogo de lentes y monturas
          </Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar gafas..."
            placeholderTextColor={COLORS.textSecondary}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {search.length > 0 && (
            <Pressable
              style={styles.clearButton}
              onPress={() => setSearch('')}
            >
              <Text style={styles.clearButtonText}>
                Limpiar búsqueda
              </Text>
            </Pressable>
          )}
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  headerSubtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
  },

  searchInput: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.lg,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body.fontSize,
  },

  clearButton: {
    alignSelf: 'flex-end',
    marginTop: SPACING.sm,
  },

  clearButtonText: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
  },

  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  separator: {
    height: SPACING.md,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: 80,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },

  emptyTitle: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.text,
    textAlign: 'center',
  },

  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
});