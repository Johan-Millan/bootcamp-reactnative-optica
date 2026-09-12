import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useCreateItem } from '../hooks/useCreateItem';
import { glassesSchema, GlassesFormData } from '../schemas/glassesSchema';
import { FormField } from '../components/FormField';
import { COLORS, SPACING } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>;

export default function CreateScreen({ navigation }: Props) {
  const { mutate, isPending } = useCreateItem();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<GlassesFormData>({
    resolver: zodResolver(glassesSchema),
    defaultValues: { name: '', description: '', brandId: 0 },
  });

  const onSubmit = (data: GlassesFormData) => {
    mutate(data, {
      onSuccess: () => navigation.goBack(),
      onError: () => Alert.alert('Error', 'No se pudo crear la gafa.'),
    });
  };

  const loading = isSubmitting || isPending;

  return (
    <View style={styles.container}>
      <FormField control={control} name="name" label="Nombre" placeholder="Ej: Ray-Ban Aviator" />
      <FormField control={control} name="description" label="Descripción" placeholder="Descripción de la gafa" multiline />
      <FormField control={control} name="brandId" label="Marca (brandId)" placeholder="Ej: 1" keyboardType="numeric" />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.lg },
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