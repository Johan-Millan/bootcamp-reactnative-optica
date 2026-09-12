import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
  multiline?: boolean;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, multiline && { height: 90 }, error && styles.inputError]}
            value={value !== undefined ? String(value) : ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  label: { ...TYPOGRAPHY.body, color: COLORS.text, marginBottom: SPACING.xs },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
  },
  inputError: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 4 },
});