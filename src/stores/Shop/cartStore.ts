// src/stores/Shop/cartStore.ts
import { defineStore } from 'pinia';
import type { CartItem, Product } from '@/types/examples';

interface CartState {
  items: CartItem[];
  taxRate: number; // Porcentaje de impuesto (IVA en Ecuador = 15%)
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    taxRate: 0.15, // 15% IVA
  }),

  getters: {
    /**
     * Número total de productos en el carrito
     */
    totalItems: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    /**
     * Subtotal sin impuestos
     */
    subtotal: (state): number => {
      return state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    /**
     * Monto de impuestos
     */
    tax(state): number {
      const subtotalValue = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      return subtotalValue * state.taxRate;
    },

    /**
     * Total con impuestos
     */
    total(state): number {
      const subtotalValue = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      return subtotalValue + (subtotalValue * state.taxRate);
    },

    /**
     * Verifica si el carrito está vacío
     */
    isEmpty: (state): boolean => {
      return state.items.length === 0;
    },

    /**
     * Obtiene la cantidad de un producto específico en el carrito
     */
    getProductQuantity: (state) => (productId: number): number => {
      const item = state.items.find(item => item.product.id === productId);
      return item ? item.quantity : 0;
    },
  },

  actions: {
    /**
     * Agregar producto al carrito
     */
    addProduct(product: Product, quantity: number = 1) {
      const existingItem = this.items.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        // Si el producto ya existe, aumentar la cantidad
        existingItem.quantity += quantity;
      } else {
        // Si no existe, agregarlo
        this.items.push({
          product,
          quantity,
        });
      }
    },

    /**
     * Remover producto del carrito
     */
    removeProduct(productId: number) {
      const index = this.items.findIndex(
        item => item.product.id === productId
      );
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },

    /**
     * Actualizar cantidad de un producto
     */
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeProduct(productId);
        } else {
          item.quantity = quantity;
        }
      }
    },

    /**
     * Incrementar cantidad de un producto
     */
    incrementQuantity(productId: number) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity++;
      }
    },

    /**
     * Decrementar cantidad de un producto
     */
    decrementQuantity(productId: number) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.removeProduct(productId);
        }
      }
    },

    /**
     * Limpiar el carrito
     */
    clearCart() {
      this.items = [];
    },

    /**
     * Actualizar la tasa de impuesto
     */
    setTaxRate(rate: number) {
      this.taxRate = rate;
    },
  },
});
