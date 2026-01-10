# Sistema de Gestión de Negocio

Aplicación web para gestión de negocio construida con Vue 3, TypeScript, PrimeVue y Tailwind CSS.

## 🚀 Características

- **Vue 3** con Composition API
- **TypeScript** para tipado fuerte
- **PrimeVue** - Biblioteca de componentes UI completa
- **Tailwind CSS** - Framework de utilidades CSS
- **Vue Router** - Navegación
- **Pinia** - Gestión de estado
- **Axios** - Cliente HTTP
- **Sistema de temas** - Modo claro/oscuro automático
- **Gestión de colores** - Personalización de paleta de colores
- **Sistema de alertas** - Confirmaciones, toasts, popups
- **Sistema de carga** - Pantallas de carga y loaders

## 📦 Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos (imágenes, iconos)
├── components/          # Componentes Vue
│   ├── Globales/       # Componentes globales (header, footer, sidebar, etc.)
│   └── Load/           # Componentes de carga
├── composables/         # Composables de Vue
│   ├── Alerts/         # Sistema de alertas
│   └── System/         # Utilidades del sistema (init, themes)
├── layouts/            # Layouts de página
├── plugins/            # Plugins de Vue
├── router/             # Configuración de rutas
├── stores/             # Stores de Pinia
│   ├── Layout/         # Estado del layout
│   ├── Load/           # Estado de carga
│   └── System/         # Temas y colores
├── styles/             # Estilos globales
├── types/              # Tipos de TypeScript
├── utils/              # Utilidades
└── views/              # Vistas/Páginas
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la compilación
npm run preview
```

## 🎨 Sistema de Colores

La plantilla incluye un sistema completo de gestión de colores personalizable:

### Uso del Composable de Colores

```typescript
import { useColorTheme } from '@/composables/System/useColorTheme';

const { updatePrimaryColor, updateSecondaryColor, resetColors } = useColorTheme();

// Actualizar color primario (genera automáticamente toda la paleta)
updatePrimaryColor('#FF0000');

// Actualizar color secundario
updateSecondaryColor('#4A4A49');

// Resetear a colores por defecto
resetColors();
```

### Componente de Gestión de Colores

```vue
<template>
  <colorThemeManager />
</template>

<script setup>
import colorThemeManager from '@/components/Globales/colorThemeManager.vue';
</script>
```

### Colores en CSS

Los colores se aplican automáticamente como variables CSS:

```css
/* Primarios */
--p-primary-50 a --p-primary-950

/* Secundarios */
--p-secondary-50 a --p-secondary-950

/* Éxito */
--p-success-50 a --p-success-950
```

## 🌓 Sistema de Temas (Claro/Oscuro)

```typescript
import { Theme } from '@/stores/System/themes';

const themeStore = Theme();

// Detectar tema del sistema
themeStore.detectSystemTheme();

// Alternar tema
themeStore.toggleTheme();

// Aplicar tema específico
themeStore.theme = 'dark';
themeStore.applyTheme();
```

## 🔔 Sistema de Alertas

### Uso del Composable de Alertas

```typescript
import { useAlerts } from '@/composables/Alerts/alertsPrime';

const alerts = useAlerts();

// Diálogo de confirmación
const confirmed = await alerts.showConfirm('¿Está seguro?', {
  danger: true,
  acceptLabel: 'Sí, continuar',
  rejectLabel: 'Cancelar',
  position: 'center'
});

if (confirmed) {
  // Usuario confirmó
}

// Popup de confirmación (anclado a elemento)
const ok = await alerts.showPopup('¿Eliminar?', {
  target: buttonElement,
  danger: true
});

// Toast
alerts.showToast('success', 'Éxito', 'Operación completada');
alerts.showToast('error', 'Error', 'Algo salió mal');
alerts.showToast('warn', 'Advertencia', 'Cuidado');
alerts.showToast('info', 'Información', 'Datos actualizados');
```

## ⏳ Sistema de Carga

```typescript
import { Load } from '@/stores/Load/load';

const loadStore = Load();

// Pantalla de carga completa
loadStore.loadScreen = true;

// Loader de petición (diálogo modal)
loadStore.loadPetition = true;

// Desactivar
loadStore.loadScreen = false;
loadStore.loadPetition = false;
```

## 🌐 Configuración de Axios

```typescript
// src/utils/Global/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptores de request
axiosInstance.interceptors.request.use(
  (config) => {
    // Agregar token si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptores de response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores global
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

## 🔧 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Mi Aplicación
```

## 📱 Responsive

La plantilla está completamente optimizada para dispositivos móviles usando:
- Tailwind CSS responsive utilities
- PrimeVue responsive components
- Sidebar responsive con transiciones

## 🎯 Próximos Pasos

1. Configurar variables de entorno
2. Personalizar colores del tema
3. Agregar tus vistas y componentes
4. Configurar rutas en `src/router/index.ts`
5. Crear stores según necesites en `src/stores/`
6. Implementar servicios API en `src/services/`

## 📚 Documentación

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PrimeVue](https://primevue.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

## 🤝 Contribuir

Esta es una plantilla base. Siéntete libre de personalizarla según las necesidades de tu proyecto.

## 📄 Licencia

MIT


