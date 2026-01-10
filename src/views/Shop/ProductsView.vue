<!-- src/views/Shop/ProductsView.vue -->
<template>
  <div class="products-view">
    <div class="products-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">
            <Icon icon="mdi:shopping" width="40" height="40" />
            Tienda
          </h1>
          <p class="page-subtitle">Explora nuestros productos y agrega al carrito</p>
        </div>

        <Button
          :label="`Ver Carrito (${cartStore.totalItems})`"
          @click="goToCart"
          severity="success"
          size="large"
          :badge="cartStore.totalItems > 0 ? cartStore.totalItems.toString() : undefined"
        >
          <template #icon>
            <Icon icon="mdi:cart" width="24" height="24" />
          </template>
        </Button>
      </div>
    </div>

    <div class="products-filters">
      <div class="search-box">
        <IconField iconPosition="left">
          <InputIcon>
            <Icon icon="mdi:magnify" width="20" height="20" />
          </InputIcon>
          <InputText
            v-model="searchQuery"
            placeholder="Buscar productos..."
            class="w-full"
          />
        </IconField>
      </div>

      <div class="category-filter">
        <Select
          v-model="selectedCategory"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Todas las categorías"
          class="w-full"
        />
      </div>
    </div>

    <div v-if="loading" class="loading-container">
      <ProgressSpinner />
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="empty-state">
      <Icon icon="mdi:inbox" class="empty-icon" width="64" height="64" />
      <h3>No se encontraron productos</h3>
      <p>Intenta con otros términos de búsqueda o filtros</p>
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ProgressSpinner from 'primevue/progressspinner';
import { Icon } from '@iconify/vue';
import ProductCard from '@/components/Shop/ProductCard.vue';
import { productsService } from '@/services/products.service';
import { useCartStore } from '@/stores/Shop/cartStore';
import type { Product } from '@/types/examples';

const router = useRouter();
const cartStore = useCartStore();

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref<string>('all');
const loading = ref(true);

const categoryOptions = computed(() => {
  return [
    { label: 'Todas las categorías', value: 'all' },
    ...categories.value.map(cat => ({ label: cat, value: cat }))
  ];
});

const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Filtrar por categoría
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory.value);
  }

  // Filtrar por búsqueda
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const loadProducts = async () => {
  try {
    loading.value = true;
    const [productsData, categoriesData] = await Promise.all([
      productsService.getAllProducts(),
      productsService.getCategories()
    ]);
    products.value = productsData;
    categories.value = categoriesData;
  } catch (error) {
    console.error('Error al cargar productos:', error);
  } finally {
    loading.value = false;
  }
};

const goToCart = () => {
  router.push({ name: 'Cart' });
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.products-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.products-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title i {
  color: var(--primary-color);
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-color-secondary);
  margin: 0;
}

.products-filters {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
  min-width: 300px;
}

.category-filter {
  min-width: 250px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  color: var(--text-color-secondary);
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.empty-state p {
  color: var(--text-color-secondary);
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .products-view {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .products-filters {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
