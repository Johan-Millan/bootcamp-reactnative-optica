import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateGlassesInput, Glasses } from '../types';
import { mockGlasses, getNextId } from '../services/mockData';

async function createGlasses(input: CreateGlassesInput): Promise<Glasses> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newItem: Glasses = { id: getNextId(), ...input };
  mockGlasses.unshift(newItem);
  return newItem;
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