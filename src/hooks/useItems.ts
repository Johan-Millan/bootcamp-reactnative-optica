import { useQuery } from '@tanstack/react-query';
import { Glasses } from '../types';
import { mockGlasses } from '../services/mockData';

async function fetchGlasses(): Promise<Glasses[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockGlasses;
}

export function useItems() {
  return useQuery({
    queryKey: ['glasses'],
    queryFn: fetchGlasses,
  });
}

async function fetchGlassesById(id: number): Promise<Glasses | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockGlasses.find((g) => g.id === id);
}

export function useItemById(id: number) {
  return useQuery({
    queryKey: ['glasses', id],
    queryFn: () => fetchGlassesById(id),
    enabled: !!id,
  });
}