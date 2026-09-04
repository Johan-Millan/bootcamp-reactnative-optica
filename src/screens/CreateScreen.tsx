import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useCreateItem } from '../hooks/useCreateItem';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>;

export default function CreateScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brandId, setBrandId] = useState('');

  const { mutate, isPending } = useCreateItem();

  const handleSubmit = () => {
    if (!name.trim() || !description.trim() || !brandId.trim()) {
      Alert.alert('Faltan datos', 'Completa todos los campos.');
      return;
    }

    mutate(
      { name, description, brandId: Number(brandId) },
      {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: () => {
          Alert.alert('Error', 'No se pudo crear la gafa.');
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Ray-Ban Aviator"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 90 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción de la gafa"
        multiline
      />

      <Text style={styles.label}>Marca (brandId)</Text>
      <TextInput
        style={styles.input}
        value={brandId}
        onChangeText={setBrandId}
        placeholder="Ej: 1"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>{isPending ? 'Guardando...' : 'Guardar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.lg },
  label: { ...TYPOGRAPHY.body, color: COLORS.text, marginBottom: SPACING.xs, marginTop: SPACING.md },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
