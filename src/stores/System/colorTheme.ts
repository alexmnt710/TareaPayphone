// src/stores/System/colorTheme.ts
import { defineStore } from 'pinia'

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorTheme {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
}

// Colores por defecto
const defaultPrimary: ColorPalette = {
  50:  '#ffe5e5',
  100: '#ffb3b3',
  200: '#ff8080',
  300: '#ff4d4d',
  400: '#ff1a1a',
  500: '#FF0000',
  600: '#cc0000',
  700: '#990000',
  800: '#660000',
  900: '#330000',
  950: '#1a0000'
};

const defaultSecondary: ColorPalette = {
  50:  '#e9e9e9',
  100: '#d4d4d4',
  200: '#b4b4b4',
  300: '#949494',
  400: '#747473',
  500: '#4A4A49',
  600: '#3d3d3c',
  700: '#2f2f2f',
  800: '#212121',
  900: '#131313',
  950: '#0a0a0a'
};

const defaultSuccess: ColorPalette = {
  50:  '#f4fbe5',
  100: '#e3f7ba',
  200: '#cef18d',
  300: '#b8ea5e',
  400: '#a3e536',
  500: '#94C11F',
  600: '#7ea81a',
  700: '#688f15',
  800: '#527510',
  900: '#3b5c0b',
  950: '#2c4707'
};

export const ColorThemeStore = defineStore('colorTheme', {
  state: (): ColorTheme => ({
    primary: { ...defaultPrimary },
    secondary: { ...defaultSecondary },
    success: { ...defaultSuccess },
  }),

  actions: {
    // Cargar colores desde localStorage
    loadColors() {
      const savedColors = localStorage.getItem('colorTheme');
      if (savedColors) {
        try {
          const colors = JSON.parse(savedColors) as ColorTheme;
          this.primary = colors.primary;
          this.secondary = colors.secondary;
          this.success = colors.success;
        } catch (error) {
          console.error('Error al cargar colores:', error);
        }
      }
      this.applyColors();
    },

    // Guardar colores en localStorage
    saveColors() {
      localStorage.setItem('colorTheme', JSON.stringify({
        primary: this.primary,
        secondary: this.secondary,
        success: this.success,
      }));
    },

    // Actualizar color primario
    setPrimary(colors: ColorPalette) {
      this.primary = colors;
      this.saveColors();
      this.applyColors();
    },

    // Actualizar color secundario
    setSecondary(colors: ColorPalette) {
      this.secondary = colors;
      this.saveColors();
      this.applyColors();
    },

    // Actualizar color de éxito
    setSuccess(colors: ColorPalette) {
      this.success = colors;
      this.saveColors();
      this.applyColors();
    },

    // Aplicar colores al CSS
    applyColors() {
      const root = document.documentElement;
      
      // Aplicar primary
      Object.entries(this.primary).forEach(([key, value]) => {
        root.style.setProperty(`--p-primary-${key}`, value);
      });

      // Aplicar secondary
      Object.entries(this.secondary).forEach(([key, value]) => {
        root.style.setProperty(`--p-secondary-${key}`, value);
      });

      // Aplicar success
      Object.entries(this.success).forEach(([key, value]) => {
        root.style.setProperty(`--p-success-${key}`, value);
      });
    },

    // Resetear a colores por defecto
    resetToDefaults() {
      this.primary = { ...defaultPrimary };
      this.secondary = { ...defaultSecondary };
      this.success = { ...defaultSuccess };
      this.saveColors();
      this.applyColors();
    },

    // Generar paleta a partir de un color base
    generatePalette(baseColor: string): ColorPalette {
      // Función auxiliar para convertir hex a RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 255, g: 0, b: 0 };
      };

      // Función auxiliar para convertir RGB a hex
      const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        }).join('');
      };

      const base = hexToRgb(baseColor);
      
      return {
        50:  rgbToHex(base.r + (255 - base.r) * 0.9, base.g + (255 - base.g) * 0.9, base.b + (255 - base.b) * 0.9),
        100: rgbToHex(base.r + (255 - base.r) * 0.7, base.g + (255 - base.g) * 0.7, base.b + (255 - base.b) * 0.7),
        200: rgbToHex(base.r + (255 - base.r) * 0.5, base.g + (255 - base.g) * 0.5, base.b + (255 - base.b) * 0.5),
        300: rgbToHex(base.r + (255 - base.r) * 0.3, base.g + (255 - base.g) * 0.3, base.b + (255 - base.b) * 0.3),
        400: rgbToHex(base.r + (255 - base.r) * 0.1, base.g + (255 - base.g) * 0.1, base.b + (255 - base.b) * 0.1),
        500: baseColor,
        600: rgbToHex(base.r * 0.8, base.g * 0.8, base.b * 0.8),
        700: rgbToHex(base.r * 0.6, base.g * 0.6, base.b * 0.6),
        800: rgbToHex(base.r * 0.4, base.g * 0.4, base.b * 0.4),
        900: rgbToHex(base.r * 0.2, base.g * 0.2, base.b * 0.2),
        950: rgbToHex(base.r * 0.1, base.g * 0.1, base.b * 0.1),
      };
    },
  },
});
