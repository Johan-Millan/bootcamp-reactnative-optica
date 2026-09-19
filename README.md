# Semana 06 - Óptica

Aplicación móvil de una óptica desarrollada con React Native, Expo y TypeScript.

## Descripción

La aplicación permite visualizar y gestionar productos de una óptica mediante diferentes pantallas y navegación entre ellas.

## Funcionalidades

- Listado de gafas.
- Visualización del detalle de una gafa.
- Creación de nuevas gafas.
- Edición de gafas.
- Navegación entre pantallas.
- Validación de formularios.
- Manejo de datos mediante React Query.
- Datos de prueba para las gafas.

## Estructura del proyecto

```text
src/
├── components/
│   └── FormField.tsx
├── hooks/
│   ├── useCreateItem.ts
│   ├── useItems.ts
│   └── useUpdateItem.ts
├── navigation/
│   ├── RootNavigator.tsx
│   └── types.ts
├── schemas/
│   └── glassesSchema.ts
├── screens/
│   ├── HomeScreen.tsx
│   ├── DetailScreen.tsx
│   ├── CreateScreen.tsx
│   └── EditScreen.tsx
├── services/
│   ├── api.ts
│   └── mockData.ts
├── theme/
│   └── index.ts
└── types/
    └── index.ts
