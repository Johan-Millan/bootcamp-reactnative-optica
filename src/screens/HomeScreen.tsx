import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useItems } from '../hooks/useItems';
import { usePreferences } from '../hooks/usePreferences';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import { Glasses } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { data, isLoading, isError, isFetching, refetch } = useItems();

  const {
    sortOrder,
    compactMode,
    itemsPerPage,
  } = usePreferences();

  const sortedGlasses = useMemo(() => {
    if (!data) {
      return [];
    }

    const glasses = [...data.glasses];

    glasses.sort((a, b) => {
      if (sortOrder === 'brand') {
        return a.brandId - b.brandId;
      }

      return a.name.localeCompare(b.name);
    });

    return glasses.slice(0, itemsPerPage);
  }, [data, sortOrder, itemsPerPage]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Ocurrió un error al cargar las gafas.
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const showingCache = data?.fromCache === true;

  return (
    <View style={styles.container}>
      {showingCache && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            ⚠️ Mostrando datos sin red
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsText}>⚙ Configuración</Text>
      </TouchableOpacity>

      <FlatList
        data={sortedGlasses}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          padding: SPACING.md,
          paddingBottom: 100,
        }}
        refreshing={isFetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              No hay gafas registradas todavía.
            </Text>
          </View>
        }
        renderItem={({ item }: { item: Glasses }) => (
          <TouchableOpacity
            style={[
              styles.card,
              compactMode && styles.compactCard,
            ]}
            onPress={() =>
              navigation.navigate('Detail', { item })
            }
          >
            <Text style={styles.cardTitle}>
              {item.name}
            </Text>

            <Text
              style={styles.cardSubtitle}
              numberOfLines={compactMode ? 1 : 2}
            >
              {item.description}
            </Text>

            {!compactMode && (
              <Text style={styles.brand}>
                Marca ID: {item.brandId}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Create')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  offlineBanner: {
    backgroundColor: '#FEF3C7',
    padding: SPACING.sm,
    alignItems: 'center',
  },
  offlineText: {
    color: '#92400E',
    fontWeight: '600',
  },
  settingsButton: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: COLORS.card,
  },
  settingsText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  compactCard: {
    paddingVertical: SPACING.sm,
  },
  cardTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  brand: {
    ...TYPOGRAPHY.caption,
    color: COLORS.muted,
    marginTop: SPACING.sm,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
  },
});