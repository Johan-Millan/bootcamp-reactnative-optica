import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Glasses } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface ItemCardProps {
  item: Glasses;
  onPress: (item: Glasses) => void;
}

export function ItemCard({
  item,
  onPress,
}: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(item)}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.cardBody}>
        <Text style={styles.cardName}>
          {item.name}
        </Text>

        <Text style={styles.cardSubtitle}>
          {item.subtitle}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardBrand}>
            {item.brand}
          </Text>

          <Text style={styles.cardPrice}>
            ${item.price.toLocaleString('es-CO')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardImage: {
    width: '100%',
    height: 160,
  },

  cardBody: {
    padding: SPACING.lg,
    gap: SPACING.xs,
  },

  cardName: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.text,
  },

  cardSubtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textSecondary,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  cardBrand: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
  },

  cardPrice: {
    ...TYPOGRAPHY.body,
    color: COLORS.success,
    fontWeight: '700',
  },
});