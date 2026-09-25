# Semana 09 — Animaciones Básicas (Óptica)
 
App móvil en **React Native + Expo** con animaciones fluidas usando **Animated API** y **LayoutAnimation**, adaptada al dominio asignado: **óptica**.
 
##  Descripción
 
Se integraron 5 animaciones/comportamientos que mejoran la experiencia de uso del catálogo de gafas, no solo como demostración visual.
 
##  Tecnologías
 
- React Native + Expo + TypeScript
- React Navigation
- Animated API (`timing`, `spring`, `parallel`, `stagger`, `interpolate`)
- LayoutAnimation
##  Animaciones implementadas
 
### 1. Entrada en `DetailScreen`
Al abrir el detalle de unas gafas, el contenido aparece suavemente combinando un fade in y un slide up con `Animated.parallel`.
 
- `opacity`: 0 → 1
- `translateY`: 30 → 0
- Duración: 500 ms
- Archivo: `src/screens/DetailScreen.tsx`
### 2. Feedback táctil en `AnimatedCard`
Cada card de gafas se comprime al presionarla y vuelve con rebote usando `Animated.spring`.
 
- `onPressIn`: `scale` 1 → 0.95
- `onPressOut`: `scale` 0.95 → 1 (con rebote)
- Archivo: `src/components/AnimatedCard.tsx`
### 3. Barra de progreso en `ProgressBar`
Muestra un dato relevante del dominio de óptica (por ejemplo, el porcentaje de stock disponible) usando `interpolate` para el ancho y el color.
 
- `width`: `'0%'` → `'100%'`
- Color: `#ef4444` → `#facc15` → `#22c55e`
- Archivo: `src/components/ProgressBar.tsx`
### 4. Entrada en cascada en `HomeScreen`
Los items de la lista de gafas aparecen uno tras otro al cargar la pantalla con `Animated.stagger(80, [...])`.
 
- Archivo: `src/screens/HomeScreen.tsx`
### 5. `LayoutAnimation` al agregar/eliminar items
Al agregar o eliminar unas gafas de la lista, el cambio de layout se anima con `LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)`.
 
- En Android se activa con `UIManager.setLayoutAnimationEnabledExperimental?.(true)` fuera del componente.
- Archivo: `src/screens/HomeScreen.tsx`
##  Rendimiento
 
Las animaciones de `opacity` y `transform` usan `useNativeDriver: true`, así corren en el hilo nativo y no bloquean el hilo de JavaScript. La animación de `width` de la barra de progreso no es compatible con el driver nativo, por eso usa `useNativeDriver: false`.
 
##  Estructura del proyecto
 
```
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   ├── AnimatedCard.tsx
    │   └── ProgressBar.tsx
    ├── navigation/
    │   ├── types.ts
    │   └── RootNavigator.tsx
    ├── screens/
    │   ├── HomeScreen.tsx
    │   └── DetailScreen.tsx
    ├── theme/
    │   └── index.ts
    └── types/
        └── index.ts
```
 
##  Cómo ejecutar
 
```bash
pnpm install
pnpm start
```
 
Escanea el QR con Expo Go o abre en un simulador con `i` (iOS) o `a` (Android).
 
