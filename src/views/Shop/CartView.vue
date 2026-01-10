<!-- src/views/Shop/CartView.vue -->
<template>
  <div class="cart-view">
    <div class="cart-header">
      <Button
        label="Volver a la tienda"
        @click="goToShop"
        text
        size="large"
      >
        <template #icon>
          <Icon icon="mdi:arrow-left" width="20" height="20" />
        </template>
      </Button>
      
      <h1 class="page-title">
        <Icon icon="mdi:cart" width="40" height="40" />
        Carrito de Compras
      </h1>
    </div>

    <div v-if="cartStore.isEmpty" class="empty-cart">
      <Icon icon="mdi:cart-outline" class="empty-icon" width="80" height="80" />
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos para comenzar tu compra</p>
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

    <div v-else class="cart-content">
      <div class="cart-items">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="cart-item"
        >
          <img
            :src="item.product.imageUrl || 'https://via.placeholder.com/100'"
            :alt="item.product.name"
            class="item-image"
          />

          <div class="item-details">
            <h3 class="item-name">{{ item.product.name }}</h3>
            <p class="item-category">
              <Icon icon="mdi:tag" width="16" height="16" />
              {{ item.product.category }}
            </p>
            <p class="item-price">
              ${{ item.product.price.toFixed(2) }} x {{ item.quantity }}
            </p>
          </div>

          <div class="item-actions">
            <div class="quantity-controls">
              <Button
                @click="cartStore.decrementQuantity(item.product.id)"
                size="small"
                outlined
              >
                <Icon icon="mdi:minus" width="16" height="16" />
              </Button>
              <span class="quantity">{{ item.quantity }}</span>
              <Button
                @click="cartStore.incrementQuantity(item.product.id)"
                size="small"
                outlined
                :disabled="item.quantity >= item.product.stock"
              >
                <Icon icon="mdi:plus" width="16" height="16" />
              </Button>
            </div>

            <div class="item-total">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </div>

            <Button
              @click="cartStore.removeProduct(item.product.id)"
              severity="danger"
              text
              rounded
            >
              <Icon icon="mdi:delete" width="20" height="20" />
            </Button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <Card>
          <template #title>
            <div class="summary-title">
              <Icon icon="mdi:calculator" width="24" height="24" />
              Resumen del Pedido
            </div>
          </template>

          <template #content>
            <div class="summary-row">
              <span>Subtotal ({{ cartStore.totalItems }} productos)</span>
              <span class="summary-value">${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>

            <div class="summary-row">
              <span>IVA (15%)</span>
              <span class="summary-value">${{ cartStore.tax.toFixed(2) }}</span>
            </div>

            <Divider />

            <div class="summary-row total">
              <span>Total</span>
              <span class="summary-value">${{ cartStore.total.toFixed(2) }}</span>
            </div>

            <Button
              label="Proceder al Pago"
              @click="goToCheckout"
              class="w-full"
              size="large"
              severity="success"
            >
              <template #icon>
                <Icon icon="mdi:credit-card" width="20" height="20" />
              </template>
            </Button>

            <Button
              label="Vaciar Carrito"
              @click="confirmClearCart"
              class="w-full"
              outlined
              severity="danger"
            >
              <template #icon>
                <Icon icon="mdi:delete" width="20" height="20" />
              </template>
            </Button>
          </template>
        </Card>

        <div class="payment-info">
          <Icon icon="mdi:shield-check" width="24" height="24" />
          <p>Pago seguro procesado por Payphone</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import { Icon } from '@iconify/vue';
import { useCartStore } from '@/stores/Shop/cartStore';

const router = useRouter();
const confirm = useConfirm();
const cartStore = useCartStore();

const goToShop = () => {
  router.push({ name: 'Products' });
};

const goToCheckout = () => {
  router.push({ name: 'Checkout' });
};

const confirmClearCart = () => {
  confirm.require({
    message: '¿Estás seguro de que quieres vaciar el carrito?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, vaciar',
    rejectLabel: 'Cancelar',
    accept: () => {
      cartStore.clearCart();
    }
  });
};
</script>

<style scoped>
.cart-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-header {
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

.page-title i {
  color: var(--primary-color);
}

.empty-cart {
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

.empty-cart h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.empty-cart p {
  color: var(--text-color-secondary);
  margin: 0 0 2rem 0;
  font-size: 1.125rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  align-items: center;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background: var(--surface-100);
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.item-category {
  color: var(--text-color-secondary);
  font-size: 0.925rem;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.item-price {
  color: var(--text-color-secondary);
  font-size: 0.925rem;
  margin: 0;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--surface-50);
  padding: 0.5rem;
  border-radius: 8px;
}

.quantity {
  font-weight: 700;
  font-size: 1rem;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
}

.cart-summary {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.summary-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
}

.summary-value {
  font-weight: 700;
}

.w-full {
  width: 100%;
  margin-top: 1rem;
}

.payment-info {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--green-50);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--green-700);
  font-size: 0.925rem;
}

.payment-info i {
  font-size: 1.5rem;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-view {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
