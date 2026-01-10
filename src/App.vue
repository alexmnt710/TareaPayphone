<!-- src/App.vue -->
<template>
  <loadScreen v-if="loadStore.loadScreen" />
  <router-view v-else/>
  <ConfirmDialog 
    group="dialog" 
    :content-class="'text-center'"
    :footer-class="'p-d-flex p-ai-center p-jc-center'"
  />
  <ConfirmPopup 
    group="popup" 
    :content-class="'text-center'"
  />
  <toastWatcher></toastWatcher>
  <Dialog 
    v-model:visible="loadStore.loadPetition"
    modal
    :closable="false"
    :style="{ width: '280px'}"
    :baseZIndex="10000"
    :content-class="'text-center'"
  >
    <div class="p-d-flex p-jc-center p-ai-center" style="gap:1rem">
      <ProgressSpinner />
    </div>
    <span>Cargando...</span>
  </Dialog>
  <Toast position="bottom-right" group="action" />
  <Toast />
</template>

<script setup lang="ts">
import { Load } from './stores/Load/load';
import loadScreen from './components/Load/loadScreen.vue';
import toastWatcher from './components/Globales/toastWatcher.vue';

const loadStore = Load();
</script>


