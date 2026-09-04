import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{item.id}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Marca (brandId)</Text>
        <Text style={styles.value}>{item.brandId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  title: { ...TYPOGRAPHY.title, color: COLORS.text, marginBottom: SPACING.lg },
  row: { marginBottom: SPACING.md },
  label: { ...TYPOGRAPHY.caption, color: COLORS.muted, marginBottom: 2 },
  value: { ...TYPOGRAPHY.body, color: COLORS.text },
});
