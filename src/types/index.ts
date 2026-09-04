// Dominio: Óptica
// Usamos JSONPlaceholder (/posts) como proxy de API real, mapeado a nuestro dominio:
// title -> name (nombre de la gafa), body -> description, userId -> brandId

export interface Glasses {
  id: number;
  name: string;
  description: string;
  brandId: number;
}

export interface CreateGlassesInput {
  name: string;
  description: string;
  brandId: number;
}
