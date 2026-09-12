import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useItemById } from '../hooks/useItems';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { glassesSchema, GlassesFormData } from '../schemas/glassesSchema';
import { FormField } from '../components/FormField';
import { COLORS, SPACING } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { data: item, isLoading } = useItemById(id);
  const { mutate, isPending } = useUpdateItem();

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<GlassesFormData>({
    resolver: zodResolver(glassesSchema),
    defaultValues: { name: '', description: '', brandId: 0 },
  });

  useEffect(() => {
    if (item) {
      reset({ name: item.name, description: item.description, brandId: item.brandId });
    }
  }, [item, reset]);

  const onSubmit = (data: GlassesFormData) => {
    mutate(
      { id, ...data },
      {
        onSuccess: () => navigation.goBack(),
        onError: () => Alert.alert('Error', 'No se pudo actualizar la gafa.'),
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Actualizar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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