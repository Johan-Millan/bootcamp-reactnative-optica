import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'El usuario debe tener mínimo 3 caracteres'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'El usuario debe tener mínimo 3 caracteres'),

    email: z
      .string()
      .email('Ingresa un correo válido'),

    password: z
      .string()
      .min(6, 'La contraseña debe tener mínimo 6 caracteres'),

    confirmPassword: z
      .string()
      .min(6, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;