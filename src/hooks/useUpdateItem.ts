import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateGlassesInput, Glasses } from '../types';
import { mockGlasses } from '../services/mockData';

interface UpdateGlassesInput extends CreateGlassesInput {
  id: number;
}

async function updateGlasses({ id, ...input }: UpdateGlassesInput): Promise<Glasses> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockGlasses.findIndex((g) => g.id === id);
  if (index === -1) throw new Error('No encontrado');
  mockGlasses[index] = { id, ...input };
  return mockGlasses[index];
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGlasses,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['glasses'] });
      queryClient.invalidateQueries({ queryKey: ['glasses', variables.id] });
    },
  });
}