<template>
  <Toolbar>
    <template #center>
      <footer class="flex items-center justify-center py-2">
        <div class="text-center flex items-center gap-2">
          <Icon icon="mdi:copyright" width="16" height="16" :style="{ color: 'var(--p-primary-500)' }" />
          <span :style="{ color: 'var(--p-text-color)' }">
            {{ new Date().getFullYear() }} Plantilla Vue 3. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
