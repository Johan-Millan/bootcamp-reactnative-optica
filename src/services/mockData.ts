import { Glasses } from '../types';

export let mockGlasses: Glasses[] = [
  { id: 1, name: 'Ray-Ban Aviator Clásico', description: 'Lentes de sol estilo piloto, montura metálica dorada', brandId: 1 },
  { id: 2, name: 'Oakley Holbrook', description: 'Lentes deportivos con protección UV400', brandId: 2 },
  { id: 3, name: 'Persol PO3019S', description: 'Montura acetato italiano, diseño vintage', brandId: 3 },
  { id: 4, name: 'Gafas de Lectura +2.00', description: 'Montura liviana en TR90, ideal para uso diario', brandId: 4 },
  { id: 5, name: 'Gucci GG0061S', description: 'Lentes de sol de lujo con logo dorado', brandId: 5 },
];

let nextId = 6;

export function getNextId() {
  return nextId++;
}