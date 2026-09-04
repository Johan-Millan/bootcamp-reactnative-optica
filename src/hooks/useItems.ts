import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Glasses } from '../types';

interface PostDTO {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Catálogo de nombres/marcas de gafas usado para "disfrazar" el texto lorem
// ipsum que devuelve la API de práctica (JSONPlaceholder), sin dejar de
// consumir la API real ni de usar useQuery.
const GLASSES_MODELS = [
  'Ray-Ban Aviator Classic',
  'Oakley Holbrook',
  'Persol PO3019S',
  'Vogue Round Metal',
  'Carrera 1001/S',
  'Gucci GG0061S',
  'Prada PR 17WS',
  'Tom Ford Snowdon',
  'Versace VE4361',
  'Warby Parker Percey',
  'Ray-Ban Wayfarer',
  'Polaroid PLD 6034',
  'Michael Kors Adrianna',
  'Armani Exchange AX4041S',
  'Fossil FOS 3097',
];

const BRANDS = ['Ray-Ban', 'Oakley', 'Persol', 'Vogue', 'Carrera'];

async function fetchGlasses(): Promise<Glasses[]> {
  const { data } = await api.get<PostDTO[]>('/posts');
  // Mapeamos el recurso de la API de práctica a nuestro dominio (Glasses),
  // usando nombres de gafas reales en vez del texto lorem ipsum original.
  return data.slice(0, 15).map((p, index) => ({
    id: p.id,
    name: GLASSES_MODELS[index % GLASSES_MODELS.length],
    description: `Montura ${BRANDS[p.userId % BRANDS.length]}, disponible en tienda. Referencia interna #${p.id}.`,
    brandId: p.userId,
  }));
}

export function useItems() {
  return useQuery({
    queryKey: ['glasses'],
    queryFn: fetchGlasses,
  });
}
