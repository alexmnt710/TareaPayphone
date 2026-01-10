
<template>
  <div class="layout-container">
    <Header />

    <div class="layout-body">
      <sideBar />

      <main class="main-content" :class="{ 'sidebar-open': sidebarStore.isOpen }">
        <router-view />
      </main>
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
// components
import Header from '@/components/Globales/header.vue';
import sideBar from '@/components/Globales/sideBar.vue';
import Footer from '@/components/Globales/footer.vue';
// stores
import { useSidebarStore } from '@/stores/Layout/layoutStore.ts';

// router + alerts
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlerts } from '@/composables/Alerts/alertsPrime';

//constants
const sidebarStore = useSidebarStore();

const route = useRoute();
const router = useRouter();
const alerts = useAlerts();

function handlePayphoneQuery(q: any) {
  if (!q) return;
  const id = q.id ? String(q.id) : null;
  const clientTx = q.clientTransactionId ? String(q.clientTransactionId) : null;
  if (id && clientTx) {
    // Si estamos en la ruta PaymentSuccess, no tocar los query params
    if (route.name === 'PaymentSuccess') {
      // dejar que el componente PaymentResponse procese y confirme la transacción
      return;
    }

    // Mostrar alerta genérica de éxito (sin exponer ids)
    alerts.showToast('success', 'Pago recibido', 'Se recibió la respuesta del pago.');

    // Limpiar query params para evitar re-disparos en otras rutas
    router.replace({ path: route.path, query: {} }).catch(() => {});
  }
}

onMounted(() => {
  handlePayphoneQuery(route.query);
});

watch(
  () => route.query,
  (newQ) => {
    handlePayphoneQuery(newQ);
  }
);

</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
  transition: margin-left 0.3s ease;
  background: var(--p-surface-ground);
}

.main-content.sidebar-open {
  margin-left: 0;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>
