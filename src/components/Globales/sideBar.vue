<template>
  <transition name="slide-sidebar">
    <div v-if="sidebarStore.isOpen" class="sidebar-container">
      <Menu :model="items" class="w-full h-full sidebar-menu">
        <template #start>
          <div class="sidebar-header">
            <Icon icon="mdi:view-dashboard" width="40" height="40" :style="{ color: 'var(--p-primary-500)' }" />
            <span class="sidebar-title" :style="{ color: 'var(--p-primary-600)' }">
              Menú
            </span>
          </div>
        </template>
        <template #item="{ item, props }">
          <a v-ripple class="menu-item" v-bind="props.action">
            <Icon v-if="item.icon" :icon="item.icon" class="menu-icon" width="24" height="24" :style="{ color: 'var(--p-primary-500)' }" />
            <span class="menu-label" :style="{ color: 'var(--p-text-color)' }">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" severity="danger" />
          </a>
        </template>
        <template #end>
          <div class="sidebar-footer">
            <Icon icon="mdi:account-circle" width="50" height="50" :style="{ color: 'var(--p-primary-500)' }" />
            <div class="user-info">
              <span class="user-name" :style="{ color: 'var(--p-primary-600)' }">Usuario Demo</span>
              <span class="user-email" :style="{ color: 'var(--p-text-color-secondary)' }">usuario@demo.com</span>
            </div>
          </div>
        </template>
      </Menu>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSidebarStore } from '@/stores/Layout/layoutStore.ts';
import { useCartStore } from '@/stores/Shop/cartStore';
import { Icon } from '@iconify/vue';

const router = useRouter();
const sidebarStore = useSidebarStore();
const cartStore = useCartStore();

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
  // Opcionalmente cerrar el sidebar en móvil
  // sidebarStore.closeSidebar();
};

const cartBadge = computed(() => {
  return cartStore.totalItems > 0 ? cartStore.totalItems.toString() : undefined;
});

const items = computed(() => [
  {
    label: 'Inicio',
    icon: 'mdi:home',
    command: () => navigateTo('Home')
  },
  {
    label: 'Tienda',
    icon: 'mdi:store',
    items: [
      {
        label: 'Productos',
        icon: 'mdi:shopping',
        command: () => navigateTo('Products')
      },
      {
        label: 'Carrito',
        icon: 'mdi:cart',
        badge: cartBadge.value,
        command: () => navigateTo('Cart')
      }
    ]
  },
  {
    label: 'Ejemplos',
    icon: 'mdi:code-braces',
    items: [
      {
        label: 'Formularios',
        icon: 'mdi:form-select',
        command: () => navigateTo('Examples')
      },
      {
        label: 'Tablas',
        icon: 'mdi:table',
        command: () => navigateTo('Tables')
      }
    ]
  },
  {
    label: 'Configuración',
    icon: 'mdi:cog',
    items: [
      {
        label: 'Colores',
        icon: 'mdi:palette',
        command: () => navigateTo('Home')
      },
      {
        label: 'General',
        icon: 'mdi:settings',
        command: () => {
          console.log('Configuración general');
        }
      }
    ]
  }
]);
</script>

<style scoped>
.sidebar-container {
  background-color: var(--p-surface-card);
  transition: all 0.3s ease;
  width: 280px;
  height: 100%;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  gap: 0.75rem;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--p-primary-50);
}

.menu-icon {
  flex-shrink: 0;
}

.menu-label {
  flex: 1;
  font-size: 0.95rem;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  gap: 0.875rem;
  margin-top: auto;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.user-email {
  font-size: 0.85rem;
}

.slide-sidebar-enter-active,
.slide-sidebar-leave-active {
  transition: transform 0.3s ease;
}

.slide-sidebar-enter-from {
  transform: translateX(-100%);
}

.slide-sidebar-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 768px) {
  .sidebar-container {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }
}
</style>
