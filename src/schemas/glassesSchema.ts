import { z } from 'zod';

export const glassesSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  brandId: z.coerce.number().int('El id de marca debe ser un entero').positive('Debe ser mayor a 0'),
});

export type GlassesFormData = z.infer<typeof glassesSchema>;