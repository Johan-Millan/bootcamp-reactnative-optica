# Semana 07 - Persistencia Local

Aplicación móvil de una óptica desarrollada con React Native y Expo.

## Persistencia utilizada

### MMKV

Se utiliza `react-native-mmkv` para guardar las preferencias del usuario de forma local y reactiva:

- Orden de los productos: por nombre o marca.
- Modo compacto.
- Cantidad de elementos por página: 5, 10 o 20.

Las preferencias se manejan mediante el hook `usePreferences`.

### AsyncStorage

Se utiliza `@react-native-async-storage/async-storage` para guardar una copia local de la lista de gafas.

Cuando la consulta funciona correctamente, los productos se guardan en caché.

Si no hay conexión y existe información guardada, la aplicación utiliza los datos de la caché y muestra:

** Mostrando datos sin red**

La lógica está encapsulada en el hook `useItems`.

### Expo SecureStore

Se utiliza `expo-secure-store` para guardar un código de acceso sensible.

El código se almacena de forma segura y no se muestra en texto plano dentro de la aplicación.

## Pantallas

### Home

- Lista de gafas.
- Ordenamiento según la preferencia guardada.
- Modo compacto.
- Cantidad de elementos configurable.
- Indicador de datos sin conexión.
- Acceso a configuración.

### Configuración

Permite modificar:

- Orden de los productos.
- Modo compacto.
- Elementos por página.
- Código de acceso almacenado mediante SecureStore.

## Hooks

### `usePreferences`

Gestiona las preferencias persistentes mediante MMKV.

### `useItems`

Gestiona la consulta de productos y la caché local mediante AsyncStorage.

## Tecnologías

- React Native
- Expo
- TypeScript
- React Navigation
- TanStack React Query
- MMKV
- AsyncStorage
- Expo SecureStore

## Ejecución

Instalar dependencias:

```bash
pnpm install