// src/composables/System/useColorTheme.ts
import { ColorThemeStore } from '@/stores/System/colorTheme';
import type { ColorPalette } from '@/stores/System/colorTheme';

export function useColorTheme() {
  const colorStore = ColorThemeStore();

  return {
    // Estado
    colors: colorStore,
    
    // Métodos
    loadColors: () => colorStore.loadColors(),
    setPrimary: (colors: ColorPalette) => colorStore.setPrimary(colors),
    setSecondary: (colors: ColorPalette) => colorStore.setSecondary(colors),
    setSuccess: (colors: ColorPalette) => colorStore.setSuccess(colors),
    resetColors: () => colorStore.resetToDefaults(),
    generatePalette: (baseColor: string) => colorStore.generatePalette(baseColor),
    
    // Método para actualizar un color base y generar su paleta
    updatePrimaryColor: (baseColor: string) => {
      const palette = colorStore.generatePalette(baseColor);
      colorStore.setPrimary(palette);
    },
    
    updateSecondaryColor: (baseColor: string) => {
      const palette = colorStore.generatePalette(baseColor);
      colorStore.setSecondary(palette);
    },
    
    updateSuccessColor: (baseColor: string) => {
      const palette = colorStore.generatePalette(baseColor);
      colorStore.setSuccess(palette);
    },
  };
}
