<template>
  <Toolbar>
    <template #start>
      <div class="flex items-center gap-4">
        <Button 
          text 
          rounded 
          @click="toggleSidebar()" 
          v-tooltip.bottom="'Menú'"
          :style="{ color: 'var(--p-primary-500)' }"
        >
          <Icon icon="mdi:menu" width="24" height="24" />
        </Button>
        <div class="hidden md:flex items-center gap-2 cursor-pointer" @click="goHome">
          <Icon icon="mdi:store" width="32" height="32" :style="{ color: 'var(--p-primary-500)' }" />
          <span class="text-xl font-bold" :style="{ color: 'var(--p-primary-600)' }">
            Sistema de Ventas
          </span>
        </div>
      </div>
    </template>

    <template #end>
      <div class="flex items-center gap-3">
        <Button 
          :label="cartStore.totalItems > 0 ? cartStore.totalItems.toString() : ''"
          @click="goToCart" 
          severity="success"
          rounded
          :badge="cartStore.totalItems > 0 ? cartStore.totalItems.toString() : undefined"
          badgeSeverity="danger"
          v-tooltip.bottom="'Carrito de compras'"
        >
          <Icon icon="mdi:cart" width="24" height="24" />
        </Button>
        <themeSelector />
      </div>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import themeSelector from './themeSelector.vue';
import { Icon } from '@iconify/vue';
import { useSidebarStore } from '@/stores/Layout/layoutStore.ts';
import { useCartStore } from '@/stores/Shop/cartStore';

const router = useRouter();
const sidebarStore = useSidebarStore();
const cartStore = useCartStore();

const toggleSidebar = () => {
  sidebarStore.toggleSidebar();
};

const goHome = () => {
  router.push({ name: 'Home' });
};

const goToCart = () => {
  router.push({ name: 'Cart' });
};
</script>



