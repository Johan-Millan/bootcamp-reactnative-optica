# Semana 08 — Autenticación Completa (Óptica)
 
App móvil en **React Native + Expo** con autenticación JWT completa, adaptada al dominio asignado: **óptica**.
 
##  Descripción
 
La app permite iniciar sesión y registrarse, guarda los tokens de forma segura y cambia de navegación según el estado de autenticación:
 
- **Stack Auth** (Login / Registro) cuando el usuario no está autenticado.
- **Stack App** (Home / Perfil) cuando el usuario está autenticado.
##  Tecnologías
 
- React Native + Expo + TypeScript
- React Navigation (navegación condicional)
- React Hook Form + Zod (formularios y validación)
- Zustand con `persist` + `partialize` (estado de autenticación)
- Expo SecureStore (almacenamiento de tokens)
- Axios (con interceptor para el refresh de token)
- API de prueba: [dummyjson.com/auth](https://dummyjson.com/docs/auth)
##  Funcionalidades implementadas
 
### Autenticación
- **LoginScreen:** formulario con `username` y `password`, validado con Zod, que llama a `login()` del store y muestra errores de credenciales.
- **RegisterScreen:** formulario con `username`, `email`, `password` y confirmación de contraseña, validado con Zod.
- **authStore (Zustand):** acciones `login()`, `logout()` y `refreshTokens()`. Solo se persiste lo necesario mediante `partialize`.
- **Tokens en SecureStore:** el access token y el refresh token nunca se guardan en AsyncStorage ni en texto plano (`tokenService.ts`).
- **Navegación condicional:** `RootNavigator` muestra `AuthNavigator` si `isAuthenticated === false` y `AppNavigator` si es `true`.
- **Interceptor de Axios:** detecta respuestas `401`, refresca el token automáticamente y reintenta la petición original.
- **Logout:** disponible desde la navegación de la app y limpia los tokens de SecureStore.
### Adaptación al dominio (óptica)
- **HomeScreen:** muestra el catálogo de gafas (`Glasses`) del dominio.
- **ProfileScreen:** muestra el nombre y el correo del usuario autenticado junto con información relacionada con el dominio de óptica.
##  Estructura del proyecto
 
```
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   └── FormField.tsx
    ├── navigation/
    │   ├── types.ts
    │   ├── AuthNavigator.tsx
    │   ├── AppNavigator.tsx
    │   └── RootNavigator.tsx
    ├── schemas/
    │   └── authSchema.ts
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── RegisterScreen.tsx
    │   ├── HomeScreen.tsx
    │   └── ProfileScreen.tsx
    ├── services/
    │   ├── api.ts
    │   ├── authService.ts
    │   └── tokenService.ts
    ├── stores/
    │   └── authStore.ts
    ├── theme/
    │   └── index.ts
    └── types/
        └── index.ts
```
 
##  API utilizada
 
| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| POST | `https://dummyjson.com/auth/login` | Login → `accessToken`, `refreshToken` y datos del usuario |
| POST | `https://dummyjson.com/auth/refresh` | Renueva `accessToken` y `refreshToken` |
| GET | `https://dummyjson.com/auth/me` | Perfil del usuario autenticado |
 
**Credenciales de prueba:** `emilys` / `emilyspass`
 
##  Cómo ejecutar
 
```bash
pnpm install
pnpm start
```
 
Escanea el QR con Expo Go o abre en un simulador con `i` (iOS) o `a` (Android).
 
##  Seguridad
 
- Tokens guardados únicamente en **SecureStore**.
- El access token no se muestra en la interfaz.
- La lógica de tokens está centralizada en `tokenService`, `authService` y `authStore`, no dispersa en las pantallas.
