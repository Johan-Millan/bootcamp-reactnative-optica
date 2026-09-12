# Semana 05 — Networking y TanStack Query v5 (Dominio: Óptica)

## Dominio
Óptica — gestión de un catálogo de gafas (`Glasses`: id, name, description, brandId).

## API usada
JSONPlaceholder (`/posts`) como proxy de API real, mapeando `title -> name`,
`body -> description`, `userId -> brandId`.

## Arquitectura
- `src/services/api.ts`: instancia de Axios con `baseURL`.
- `src/hooks/useItems.ts`: `useQuery` para listar gafas (`queryKey: ['glasses']`).
- `src/hooks/useCreateItem.ts`: `useMutation` para crear una gafa (POST) con
  `invalidateQueries` en `onSuccess`.
- `src/screens/HomeScreen.tsx`: lista (FlatList) con loading, error, empty y
  pull-to-refresh.
- `src/screens/DetailScreen.tsx`: detalle del ítem seleccionado.
- `src/screens/CreateScreen.tsx`: formulario de creación.

## Cómo ejecutar
```bash
npm install
npx expo start
```

## Capturas
_Agregar capturas de pantalla del simulador aquí._
