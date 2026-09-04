import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Glasses } from '../types';

interface PostDTO {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function fetchGlasses(): Promise<Glasses[]> {
  const { data } = await api.get<PostDTO[]>('/posts');
  // Mapeamos el recurso de la API de práctica a nuestro dominio (Glasses)
  return data.slice(0, 15).map((p) => ({
    id: p.id,
    name: p.title,
    description: p.body,
    brandId: p.userId,
  }));
}

export function useItems() {
  return useQuery({
    queryKey: ['glasses'],
    queryFn: fetchGlasses,
  });
}
