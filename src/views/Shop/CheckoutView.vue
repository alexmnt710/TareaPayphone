<!-- src/views/Shop/CheckoutView.vue -->
<template>
  <div class="checkout-view">
    <div class="checkout-header">
      <Button
        label="Volver al carrito"
        @click="goToCart"
        text
        size="large"
      >
        <template #icon>
          <Icon icon="mdi:arrow-left" width="20" height="20" />
        </template>
      </Button>
      
      <h1 class="page-title">
        <Icon icon="mdi:credit-card" width="40" height="40" />
        Checkout - Pago con Payphone
      </h1>
    </div>

    <div v-if="cartStore.isEmpty" class="empty-state">
      <Icon icon="mdi:cart-outline" class="empty-icon" width="80" height="80" />
      <h2>No hay productos en el carrito</h2>
      <p>Agrega productos antes de proceder al pago</p>
      <Button
        label="Ir a la tienda"
        @click="goToShop"
        size="large"
      >
        <template #icon>
          <Icon icon="mdi:shopping" width="24" height="24" />
        </template>
      </Button>
    </div>

    <div v-else class="checkout-content">
      <div class="checkout-main">
        <Card class="payment-card">
          <template #title>
            <div class="card-title">
              <Icon icon="mdi:cellphone" width="28" height="28" />
              Pago Seguro con Payphone
            </div>
          </template>

          <template #content>
            <div class="payphone-header">
              <h3 class="payphone-title">Payphone</h3>
              <p class="payphone-subtitle">Completa tu pago de forma segura</p>
            </div>

            <Divider />

            <!-- Cajita de Payphone -->
            <div id="pp-button"></div>

            <div class="payment-info">
              <Icon icon="mdi:shield-check" width="24" height="24" />
              <div>
                <p class="info-title">Pago 100% seguro</p>
                <p class="info-text">Tus datos están protegidos con encriptación SSL</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="checkout-summary">
        <Card>
          <template #title>
            <div class="card-title">
              <Icon icon="mdi:format-list-bulleted" width="24" height="24" />
              Resumen del Pedido
            </div>
          </template>

          <template #content>
            <div class="order-items">
              <div
                v-for="item in cartStore.items"
                :key="item.product.id"
                class="order-item"
              >
                <img
                  :src="item.product.imageUrl || 'https://via.placeholder.com/50'"
                  :alt="item.product.name"
                  class="order-item-image"
                />
                <div class="order-item-info">
                  <span class="order-item-name">{{ item.product.name }}</span>
                  <span class="order-item-quantity">x{{ item.quantity }}</span>
                </div>
                <span class="order-item-price">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <Divider />

            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>

            <div class="summary-row">
              <span>IVA (15%)</span>
              <span>${{ cartStore.tax.toFixed(2) }}</span>
            </div>

            <Divider />

            <div class="summary-row total">
              <span>Total a Pagar</span>
              <span>${{ cartStore.total.toFixed(2) }}</span>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import { Icon } from '@iconify/vue';
import { useCartStore } from '@/stores/Shop/cartStore';
import { useAlerts } from '@/composables/Alerts/alertsPrime';

const router = useRouter();
const cartStore = useCartStore();
const alerts = useAlerts();

const PAYPHONE_ID = import.meta.env.VITE_PAYPHONE_APPID || '61jJ6FgjS2rw0jTO9RDh96rLC-SaFLTlE1spb_Avgy3JB0JYXO1hiUUZunKm_v9pjHz3YVcFRiOulBiXs7GviK5G0c-uX_i_6SqvFyq9fdJ2eBvhvKAjNbhGJVBvoDkLHxFaOujfnW2WppdjOayxtorOvBPIJhCExRi-9AW3fCbvJsWlZzQLvzJTtN7NcSvjKNz9ju7DR5nzE2ND9v8KP5st9IsmJjD1UgpQ0zpTNmE096hfHMSW_AB87WrQxZLGWTIepTT1UtTB-GDg3adY1B8ima--C0Yxns4e1rwULIk0Jceow73rq-eugFYQ7T4e1b4EtA';

const goToCart = () => {
  router.push({ name: 'Cart' });
};

const goToShop = () => {
  router.push({ name: 'Products' });
};

const loadPayphoneResources = () => {
  return new Promise((resolve, reject) => {
    // Verificar si ya están cargados
    if (document.getElementById('payphone-script') && document.getElementById('payphone-css')) {
      resolve(true);
      return;
    }

    // Cargar CSS
    if (!document.getElementById('payphone-css')) {
      const link = document.createElement('link');
      link.id = 'payphone-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css';
      document.head.appendChild(link);
    }

    // Cargar Script
    if (!document.getElementById('payphone-script')) {
      const script = document.createElement('script');
      script.id = 'payphone-script';
      script.type = 'module';
      script.src = 'https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Error al cargar el script de Payphone'));
      document.head.appendChild(script);
    } else {
      resolve(true);
    }
  });
};

const initPayphoneButton = () => {
  if (!(window as any).PPaymentButtonBox) {
    console.error('PPaymentButtonBox no está disponible');
    return;
  }

  let clientTransactionId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  // Asegurar que no supere 50 caracteres (requerimiento de Payphone)
  if (clientTransactionId.length > 50) {
    clientTransactionId = clientTransactionId.substr(0, 50);
  }
  
  // Guardar información de la orden antes del pago
  localStorage.setItem('pendingOrder', JSON.stringify({
    items: cartStore.items,
    totals: {
      subtotal: cartStore.subtotal,
      tax: cartStore.tax,
      total: cartStore.total,
    },
    clientTransactionId,
    timestamp: new Date().toISOString(),
  }));

  const centsSubtotal = Math.round(cartStore.subtotal * 100);
  const centsTax = Math.round(cartStore.tax * 100);
  const centsTotal = Math.round(cartStore.total * 100);

  const storeId = import.meta.env.VITE_PAYPHONE_STOREID || undefined;

  const config: any = {
    token: PAYPHONE_ID,
    clientTransactionId: clientTransactionId,
    amount: centsTotal,
    // Si todo el subtotal está sujeto a impuesto, ponerlo en amountWithTax
    amountWithTax: centsSubtotal,
    amountWithoutTax: 0,
    tax: centsTax,
    service: 0,
    tip: 0,
    currency: 'USD',
    reference: `Orden-${Date.now()}`,
    lang: 'es',
    defaultMethod: 'card',
    timeZone: -5,
  };

  if (storeId) {
    config.storeId = storeId;
  }

  console.log('Configuración de Payphone:', config);

  try {
    const ppb = new (window as any).PPaymentButtonBox(config);
    ppb.render('pp-button');
  } catch (error) {
    console.error('Error al crear el botón de Payphone:', error);
    alerts.showToast('error', 'Error', 'No se pudo inicializar el botón de pago. Verifica tu conexión.');
  }
};

onMounted(async () => {
  if (cartStore.isEmpty) {
    return;
  }

  try {
    await loadPayphoneResources();
    
    // Esperar a que el script se inicialice completamente
    setTimeout(() => {
      initPayphoneButton();
    }, 1000);
  } catch (error) {
    console.error('Error al inicializar Payphone:', error);
    alerts.showToast('error', 'Error', 'No se pudo cargar el sistema de pagos. Por favor, intenta nuevamente.');
  }
});

onBeforeUnmount(() => {
  // Limpiar el botón de Payphone si existe
  const button = document.getElementById('pp-button');
  if (button) {
    button.innerHTML = '';
  }
});
</script>

<style scoped>
.checkout-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.checkout-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 1rem 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title :deep(svg) {
  color: var(--primary-color);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface-card);
  border-radius: 12px;
  border: 1px solid var(--surface-border);
}

.empty-icon {
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
}

.empty-state h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.empty-state p {
  color: var(--text-color-secondary);
  margin: 0 0 2rem 0;
  font-size: 1.125rem;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 2rem;
}

.checkout-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.payphone-header {
  text-align: center;
  padding: 1rem 0;
}

.payphone-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
}

.payphone-subtitle {
  color: var(--text-color-secondary);
  font-size: 1rem;
  margin: 0;
}

#pp-button {
  margin: 2rem 0;
  min-height: 50px;
}

.payment-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--green-50);
  border-radius: 12px;
  margin-top: 1.5rem;
}

.payment-info :deep(svg) {
  color: var(--green-600);
  flex-shrink: 0;
}

.info-title {
  font-weight: 700;
  color: var(--green-700);
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.info-text {
  color: var(--green-600);
  margin: 0;
  font-size: 0.875rem;
}

.checkout-summary {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.order-item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--surface-100);
}

.order-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-item-name {
  font-weight: 600;
  font-size: 0.925rem;
}

.order-item-quantity {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.order-item-price {
  font-weight: 700;
  color: var(--primary-color);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary-color);
  padding: 1rem 0;
}

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .checkout-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout-view {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }
}
</style>
