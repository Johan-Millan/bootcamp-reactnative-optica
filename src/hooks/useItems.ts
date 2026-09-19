import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Glasses } from '../types';
import { mockGlasses } from '../services/mockData';

const CACHE_KEY = '@optica_glasses_cache';

async function fetchGlasses(): Promise<Glasses[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockGlasses;
}

async function getCachedGlasses(): Promise<Glasses[]> {
  const cached = await AsyncStorage.getItem(CACHE_KEY);

  if (!cached) {
    throw new Error('No hay datos guardados en caché');
  }

  return JSON.parse(cached) as Glasses[];
}

async function fetchGlassesWithCache(): Promise<{
  glasses: Glasses[];
  fromCache: boolean;
}> {
  try {
    const glasses = await fetchGlasses();

    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify(glasses),
    );

    return {
      glasses,
      fromCache: false,
    };
  } catch {
    const glasses = await getCachedGlasses();

    return {
      glasses,
      fromCache: true,
    };
  }
}

export function useItems() {
  return useQuery({
    queryKey: ['glasses'],
    queryFn: fetchGlassesWithCache,
  });
}

async function fetchGlassesById(
  id: number,
): Promise<Glasses | undefined> {
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