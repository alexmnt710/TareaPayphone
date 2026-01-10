import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

// Importamos los colores desde el nuevo módulo
import { primary, secondary, success } from './colors';

export default definePreset(Aura, {
  semantic: {
    // Ahora referenciamos las constantes de color
    primary,
    secondary,
    success,

    // El resto de la configuración permanece igual
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}'
        },
        secondary: {
          color: '{secondary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{secondary.600}',
          activeColor: '{secondary.700}'
        },
        success: {
          color: '{success.500}',
          contrastColor: '#ffffff',
          hoverColor: '{success.600}',
          activeColor: '{success.700}'
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}'
        },
        surface: {
          background: '#ffffff',
          color: '#000000',
          borderColor: '#e0e0e0',
          hoverBackground: '#f5f5f5',
          activeBackground: '#e0e0e0'
        }
      },
      dark: {
        primary: {
          color: '{primary.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}'
        },
        secondary: {
          color: '{secondary.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{secondary.300}',
          activeColor: '{secondary.200}'
        },
        success: {
          color: '{success.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{success.300}',
          activeColor: '{success.200}'
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        },
        surface: {
          background: '#000000',
          color: '#ffffff',
          borderColor: '#424242',
          hoverBackground: '#121212',
          activeBackground: '#1f1f1f'
        }
      }
    }
  }
});
