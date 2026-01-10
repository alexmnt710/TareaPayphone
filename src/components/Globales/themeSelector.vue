<template>
  <Button 
    :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'" 
    text 
    rounded 
    @click="toggleTheme"
    v-tooltip.bottom="isDark ? 'Modo Claro' : 'Modo Oscuro'"
    :style="{ color: 'var(--p-primary-500)' }"
  >
    <template #icon>
      <Icon 
        :icon="isDark ? 'line-md:moon-filled' : 'line-md:sun-rising-filled-loop'" 
        width="24" 
        height="24"
        :style="{ color: 'var(--p-primary-500)' }"
      />
    </template>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Theme } from '@/stores/System/themes'
import { Icon } from '@iconify/vue'

const themeStore = Theme()
const isDark = computed(() => themeStore.theme === 'dark')

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>
