import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { CreateGlassesInput } from '../types';

async function createGlasses(input: CreateGlassesInput) {
  const { data } = await api.post('/posts', {
    title: input.name,
    body: input.description,
    userId: input.brandId,
  });
  return data;
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGlasses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glasses'] });
    },
  });
}
