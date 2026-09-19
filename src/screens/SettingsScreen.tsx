import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';

const SECURE_KEY = 'optica_access_code';

export default function SettingsScreen() {
  const {
    sortOrder,
    setSortOrder,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
  } = usePreferences();

  const [hasSecureCode, setHasSecureCode] = useState(false);

  const saveSecureCode = async () => {
    const code = 'codigo-demo';

    await SecureStore.setItemAsync(SECURE_KEY, code);

    setHasSecureCode(true);

    Alert.alert(
      'Seguridad',
      'Código de acceso guardado correctamente.',
    );
  };

  const readSecureCode = async () => {
    const value = await SecureStore.getItemAsync(SECURE_KEY);

    if (value) {
      setHasSecureCode(true);

      Alert.alert(
        'Seguridad',
        'El código de acceso está guardado de forma segura.',
      );
    } else {
      setHasSecureCode(false);

      Alert.alert(
        'Seguridad',
        'No hay ningún código guardado.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <Text style={styles.sectionTitle}>Preferencias</Text>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.label}>Modo compacto</Text>
          <Text style={styles.description}>
            Reduce el espacio de las tarjetas.
          </Text>
        </View>

        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
        />
      </View>

      <Text style={styles.label}>Ordenar gafas por</Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.option,
            sortOrder === 'name' && styles.selectedOption,
          ]}
          onPress={() => setSortOrder('name')}
        >
          <Text
            style={[
              styles.optionText,
              sortOrder === 'name' && styles.selectedText,
            ]}
          >
            Nombre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            sortOrder === 'brand' && styles.selectedOption,
          ]}
          onPress={() => setSortOrder('brand')}
        >
          <Text
            style={[
              styles.optionText,
              sortOrder === 'brand' && styles.selectedText,
            ]}
          >
            Marca
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Gafas por página</Text>

      <View style={styles.options}>
        {[5, 10, 20].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.option,
              itemsPerPage === value && styles.selectedOption,
            ]}
            onPress={() => setItemsPerPage(value)}
          >
            <Text
              style={[
                styles.optionText,
                itemsPerPage === value && styles.selectedText,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Seguridad</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={saveSecureCode}
      >
        <Text style={styles.buttonText}>
          Guardar código de acceso
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={readSecureCode}
      >
        <Text style={styles.secondaryButtonText}>
          Verificar código guardado
        </Text>
      </TouchableOpacity>

      {hasSecureCode && (
        <Text style={styles.success}>
          ✓ Código guardado de forma segura
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  rowText: {
    flex: 1,
    marginRight: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
  },
  options: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.text,
  },
  selectedText: {
    color: '#fff',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  success: {
    color: COLORS.primary,
    marginTop: SPACING.md,
  },
});