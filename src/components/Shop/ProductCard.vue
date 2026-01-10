<!-- src/components/Shop/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="product-image-container">
      <img
        :src="product.imageUrl || 'https://via.placeholder.com/300x200'"
        :alt="product.name"
        class="product-image"
      />
      <div v-if="product.stock <= 5" class="stock-badge">
        <Icon icon="mdi:alert" width="16" height="16" />
        ¡Pocas unidades!
      </div>
    </div>

    <div class="product-content">
      <div class="product-category">
        <Icon icon="mdi:tag" width="16" height="16" />
        {{ product.category }}
      </div>

      <h3 class="product-name">{{ product.name }}</h3>

      <p class="product-description">
        {{ truncateDescription(product.description, 80) }}
      </p>

      <div class="product-footer">
        <div class="product-price">
          <span class="currency">$</span>
          <span class="amount">{{ formatPrice(product.price) }}</span>
        </div>

        <div class="product-actions">
          <Button
            v-if="!isInCart"
            label="Agregar"
            @click="addToCart"
            :disabled="product.stock === 0"
            severity="success"
          >
            <template #icon>
              <Icon icon="mdi:cart-plus" width="20" height="20" />
            </template>
          </Button>
          
          <div v-else class="quantity-controls">
            <Button
              @click="decrementQuantity"
              size="small"
              outlined
              severity="secondary"
            >
              <Icon icon="mdi:minus" width="16" height="16" />
            </Button>
            <span class="quantity">{{ cartQuantity }}</span>
            <Button
              @click="incrementQuantity"
              size="small"
              outlined
              severity="secondary"
              :disabled="cartQuantity >= product.stock"
            >
              <Icon icon="mdi:plus" width="16" height="16" />
            </Button>
          </div>
        </div>
      </div>

      <div v-if="product.stock === 0" class="out-of-stock">
        <Icon icon="mdi:close-circle" width="16" height="16" />
        Agotado
      </div>
      <div v-else class="stock-info">
        <Icon icon="mdi:check-circle" width="16" height="16" />
        {{ product.stock }} disponibles
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import { Icon } from '@iconify/vue';
import type { Product } from '@/types/examples';
import { useCartStore } from '@/stores/Shop/cartStore';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const cartStore = useCartStore();

const isInCart = computed(() => {
  return cartStore.getProductQuantity(props.product.id) > 0;
});

const cartQuantity = computed(() => {
  return cartStore.getProductQuantity(props.product.id);
});

const addToCart = () => {
  cartStore.addProduct(props.product, 1);
};

const incrementQuantity = () => {
  cartStore.incrementQuantity(props.product.id);
};

const decrementQuantity = () => {
  cartStore.decrementQuantity(props.product.id);
};

const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

const truncateDescription = (text: string | undefined, maxLength: number): string => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
</script>

<style scoped>
.product-card {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--surface-100);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stock-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--orange-500);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.product-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: var(--text-color);
  line-height: 1.4;
}

.product-description {
  color: var(--text-color-secondary);
  font-size: 0.925rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-border);
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.currency {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

.amount {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary-color);
}

.product-actions {
  display: flex;
  gap: 0.5rem;
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
  min-width: 20px;
  text-align: center;
}

.stock-info,
.out-of-stock {
  margin-top: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

.stock-info {
  background: var(--green-50);
  color: var(--green-700);
}

.out-of-stock {
  background: var(--red-50);
  color: var(--red-700);
}
</style>
