<template>
  <div class="p-4">
    <div class="mb-6">
      <h1 class="text-4xl font-bold mb-2" :style="{ color: 'var(--p-primary-600)' }">
        <Icon icon="mdi:store" width="40" height="40" :style="{ color: 'var(--p-primary-500)', verticalAlign: 'middle' }" />
        Sistema de Ventas
      </h1>
      <p class="text-lg" :style="{ color: 'var(--p-text-color-secondary)' }">
        Bienvenido a tu tienda en línea con integración de Payphone
      </p>
    </div>
    
    <!-- Sección principal de la tienda -->
    <div class="welcome-section mb-6">
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">
            <Icon icon="mdi:shopping" width="28" height="28" :style="{ verticalAlign: 'middle' }" />
            ¡Comienza tu compra!
          </span>
        </template>
        <template #content>
          <p class="mb-4" :style="{ color: 'var(--p-text-color-secondary)' }">
            Explora nuestro catálogo de productos y realiza tus compras de forma segura con Payphone.
          </p>
          <div class="flex gap-3 flex-wrap">
            <Button 
              label="Ver Productos" 
              icon="pi pi-shopping-bag" 
              size="large"
              @click="goToProducts"
            />
            <Button 
              label="Ver Carrito" 
              icon="pi pi-shopping-cart" 
              severity="success"
              outlined
              size="large"
              :badge="cartStore.totalItems > 0 ? cartStore.totalItems.toString() : undefined"
              @click="goToCart"
            />
          </div>
        </template>
      </Card>
    </div>
    
    <Tabs value="0">
      <TabList>
        <Tab value="0">
          <Icon icon="mdi:information" width="20" height="20" class="mr-2" />
          Información del Sistema
        </Tab>
        <Tab value="1">
          <Icon icon="mdi:palette" width="20" height="20" class="mr-2" />
          Gestión de Colores
        </Tab>
        <Tab value="2">
          <Icon icon="mdi:puzzle" width="20" height="20" class="mr-2" />
          Ejemplos de Componentes
        </Tab>
      </TabList>
      
      <TabPanels>
        <!-- Tab 1: Información del Sistema -->
        <TabPanel value="0">
          <div class="p-4">
            <h2 class="text-2xl font-semibold mb-4" :style="{ color: 'var(--p-primary-600)' }">
              Características del Sistema
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:cart" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Gestión de Carrito
                  </span>
                </template>
                <template #content>
                  <p :style="{ color: 'var(--p-text-color-secondary)' }">
                    Sistema completo de carrito de compras con persistencia en localStorage,
                    cálculo automático de impuestos y gestión de cantidades.
                  </p>
                </template>
              </Card>

              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:credit-card" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Integración Payphone
                  </span>
                </template>
                <template #content>
                  <p :style="{ color: 'var(--p-text-color-secondary)' }">
                    Procesamiento de pagos seguro con Payphone. Acepta tarjetas de crédito
                    y débito con encriptación SSL.
                  </p>
                </template>
              </Card>

              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:package-variant" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Catálogo de Productos
                  </span>
                </template>
                <template #content>
                  <p :style="{ color: 'var(--p-text-color-secondary)' }">
                    Visualización de productos con filtros por categoría, búsqueda en tiempo real
                    y gestión de inventario.
                  </p>
                </template>
              </Card>

              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:alert" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Alertas y Confirmaciones
                  </span>
                </template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Button label="Confirmar" @click="onConfirm" icon="pi pi-check" />
                    <Button label="Popup" @click="onPopup" icon="pi pi-info-circle" severity="secondary" />
                  </div>
                </template>
              </Card>

              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:bell" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Notificaciones Toast
                  </span>
                </template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Button label="Éxito" @click="onToast('success')" severity="success" size="small" />
                    <Button label="Error" @click="onToast('error')" severity="danger" size="small" />
                    <Button label="Advertencia" @click="onToast('warn')" severity="warn" size="small" />
                    <Button label="Info" @click="onToast('info')" severity="info" size="small" />
                  </div>
                </template>
              </Card>

              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:loading" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Estados de Carga
                  </span>
                </template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Button label="Loader Pantalla" @click="onShowLoader" severity="secondary" icon="pi pi-spin pi-spinner" />
                    <Button label="Loader Petición" @click="onShowLoaderPetition" severity="secondary" icon="pi pi-clock" />
                    <Button label="Cerrar" @click="onCloseLoader" severity="secondary" icon="pi pi-times" />
                  </div>
                </template>
              </Card>

              <Card>
                <template #title>
                  <span :style="{ color: 'var(--p-primary-600)' }">
                    <Icon icon="mdi:information" width="24" height="24" :style="{ verticalAlign: 'middle' }" />
                    Información de Colores
                  </span>
                </template>
                <template #content>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded" :style="{ backgroundColor: 'var(--p-primary-500)' }"></div>
                      <span class="text-sm">Primario: <code>var(--p-primary-500)</code></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded" :style="{ backgroundColor: 'var(--p-secondary-500)' }"></div>
                      <span class="text-sm">Secundario: <code>var(--p-secondary-500)</code></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded" :style="{ backgroundColor: 'var(--p-success-500)' }"></div>
                      <span class="text-sm">Éxito: <code>var(--p-success-500)</code></span>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </TabPanel>
        
        <!-- Tab 2: Colores -->
        <TabPanel value="1">
          <colorThemeManager />
        </TabPanel>

        <!-- Tab 3: Ejemplos -->
        <TabPanel value="2">
          <div class="p-4">
            <h2 class="text-2xl font-semibold mb-4" :style="{ color: 'var(--p-primary-600)' }">
              Ejemplos de Componentes
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <template #title>Botones con Colores Dinámicos</template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Button label="Primario" :style="{ backgroundColor: 'var(--p-primary-500)', borderColor: 'var(--p-primary-500)' }" />
                    <Button label="Secundario" :style="{ backgroundColor: 'var(--p-secondary-500)', borderColor: 'var(--p-secondary-500)' }" />
                    <Button label="Éxito" :style="{ backgroundColor: 'var(--p-success-500)', borderColor: 'var(--p-success-500)' }" />
                  </div>
                </template>
              </Card>

              <Card>
                <template #title>Badges con Colores</template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Badge value="2" severity="primary" />
                    <Badge value="8" severity="success" />
                    <Badge value="4" severity="info" />
                    <Badge value="12" severity="warn" />
                  </div>
                </template>
              </Card>

              <Card>
                <template #title>Chips Personalizados</template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Chip label="Vue 3" icon="pi pi-check" :style="{ backgroundColor: 'var(--p-primary-100)', color: 'var(--p-primary-700)' }" />
                    <Chip label="TypeScript" icon="pi pi-code" :style="{ backgroundColor: 'var(--p-secondary-100)', color: 'var(--p-secondary-700)' }" />
                    <Chip label="PrimeVue" icon="pi pi-star" :style="{ backgroundColor: 'var(--p-success-100)', color: 'var(--p-success-700)' }" />
                  </div>
                </template>
              </Card>

              <Card>
                <template #title>Tags Dinámicos</template>
                <template #content>
                  <div class="flex gap-2 flex-wrap">
                    <Tag value="Activo" severity="success" />
                    <Tag value="Pendiente" severity="warn" />
                    <Tag value="Nuevo" severity="info" />
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useAlerts } from '@/composables/Alerts/alertsPrime';
import { Load } from '@/stores/Load/load';
import { useCartStore } from '@/stores/Shop/cartStore';
import colorThemeManager from '@/components/Globales/colorThemeManager.vue';

const router = useRouter();
const alerts = useAlerts();
const loadStore = Load();
const cartStore = useCartStore();
const popupTarget = ref<HTMLElement | null>(null);

function goToProducts() {
  router.push({ name: 'Products' });
}

function goToCart() {
  router.push({ name: 'Cart' });
}

async function onConfirm() {
  const ok = await alerts.showConfirm('¿Estás seguro de ejecutar esta acción?', {
    danger: true,
    acceptLabel: 'Sí, continuar',
    rejectLabel: 'No, cancelar',
    position: 'center',
  });
  if (ok) {
    console.log('Usuario confirmó');
    alerts.showToast('success', 'Confirmado', 'Acción ejecutada correctamente');
  } else {
    console.log('Usuario canceló');
  }
}

async function onPopup(event: MouseEvent) {
  popupTarget.value = event.currentTarget as HTMLElement;
  const ok = await alerts.showPopup('¿Eliminar este ítem?', {
    target: popupTarget.value,
    header: 'Confirmación rápida',
    danger: true,
  });
  if (ok) {
    console.log('Popup confirmado');
    alerts.showToast('info', 'Eliminado', 'El ítem fue eliminado');
  }
}

function onToast(type: 'success' | 'error' | 'warn' | 'info') {
  const messages = {
    success: { title: 'Operación exitosa', detail: 'El proceso se completó correctamente' },
    error: { title: 'Error', detail: 'Ocurrió un error al procesar la solicitud' },
    warn: { title: 'Advertencia', detail: 'Por favor, revise la información' },
    info: { title: 'Información', detail: 'Los datos han sido actualizados' }
  };
  
  alerts.showToast(type, messages[type].title, messages[type].detail);
}

function onShowLoader() {
  loadStore.loadScreen = true;
  setTimeout(() => {
    loadStore.loadScreen = false;
  }, 3000);
}

function onShowLoaderPetition() {
  loadStore.loadPetition = true;
  setTimeout(() => {
    loadStore.loadPetition = false;
  }, 2000);
}

function onCloseLoader() {
  loadStore.loadScreen = false;
  loadStore.loadPetition = false;
}
</script>

