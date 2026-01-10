<!-- src/components/Globales/colorThemeManager.vue -->
<template>
  <div class="color-theme-manager p-4">
    <h2 class="text-2xl font-bold mb-4">Configuración de Colores</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <!-- Color Primario -->
      <div class="color-section">
        <label class="block font-semibold mb-2">Color Primario</label>
        <div class="flex gap-2 items-center">
          <input 
            type="color" 
            v-model="primaryColor" 
            @change="updatePrimary"
            class="color-picker"
          />
          <span class="text-sm">{{ primaryColor }}</span>
        </div>
        <div class="palette-preview mt-2">
          <div 
            v-for="(value, key) in colors.primary" 
            :key="key"
            :style="{ backgroundColor: value }"
            class="palette-swatch"
            :title="`${key}: ${value}`"
          ></div>
        </div>
      </div>

      <!-- Color Secundario -->
      <div class="color-section">
        <label class="block font-semibold mb-2">Color Secundario</label>
        <div class="flex gap-2 items-center">
          <input 
            type="color" 
            v-model="secondaryColor" 
            @change="updateSecondary"
            class="color-picker"
          />
          <span class="text-sm">{{ secondaryColor }}</span>
        </div>
        <div class="palette-preview mt-2">
          <div 
            v-for="(value, key) in colors.secondary" 
            :key="key"
            :style="{ backgroundColor: value }"
            class="palette-swatch"
            :title="`${key}: ${value}`"
          ></div>
        </div>
      </div>

      <!-- Color de Éxito -->
      <div class="color-section">
        <label class="block font-semibold mb-2">Color de Éxito</label>
        <div class="flex gap-2 items-center">
          <input 
            type="color" 
            v-model="successColor" 
            @change="updateSuccess"
            class="color-picker"
          />
          <span class="text-sm">{{ successColor }}</span>
        </div>
        <div class="palette-preview mt-2">
          <div 
            v-for="(value, key) in colors.success" 
            :key="key"
            :style="{ backgroundColor: value }"
            class="palette-swatch"
            :title="`${key}: ${value}`"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <Button label="Resetear Colores" severity="secondary" @click="resetColors" />
      <Button label="Exportar Configuración" severity="info" @click="exportConfig" />
      <Button label="Importar Configuración" severity="info" @click="triggerImport" />
      <input 
        ref="fileInput" 
        type="file" 
        accept=".json" 
        @change="importConfig" 
        style="display: none;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useColorTheme } from '@/composables/System/useColorTheme';

const { colors, updatePrimaryColor, updateSecondaryColor, updateSuccessColor, resetColors: reset } = useColorTheme();

const primaryColor = ref(colors.primary[500]);
const secondaryColor = ref(colors.secondary[500]);
const successColor = ref(colors.success[500]);
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  primaryColor.value = colors.primary[500];
  secondaryColor.value = colors.secondary[500];
  successColor.value = colors.success[500];
});

function updatePrimary() {
  updatePrimaryColor(primaryColor.value);
}

function updateSecondary() {
  updateSecondaryColor(secondaryColor.value);
}

function updateSuccess() {
  updateSuccessColor(successColor.value);
}

function resetColors() {
  reset();
  primaryColor.value = colors.primary[500];
  secondaryColor.value = colors.secondary[500];
  successColor.value = colors.success[500];
}

function exportConfig() {
  const config = {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
  };
  
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'color-theme-config.json';
  a.click();
  URL.revokeObjectURL(url);
}

function triggerImport() {
  fileInput.value?.click();
}

function importConfig(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        colors.primary = config.primary;
        colors.secondary = config.secondary;
        colors.success = config.success;
        colors.applyColors();
        colors.saveColors();
        
        primaryColor.value = colors.primary[500];
        secondaryColor.value = colors.secondary[500];
        successColor.value = colors.success[500];
      } catch (error) {
        console.error('Error al importar configuración:', error);
      }
    };
    reader.readAsText(file);
  }
}
</script>

<style scoped>
.color-picker {
  width: 60px;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.palette-preview {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
}

.palette-swatch {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.color-section {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 8px;
}
</style>
