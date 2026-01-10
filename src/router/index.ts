// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Global/HomeView.vue';
import ExamplesView from '@/views/Global/ExamplesView.vue';
import TablesView from '@/views/Global/TablesView.vue';
import ProductsView from '@/views/Shop/ProductsView.vue';
import CartView from '@/views/Shop/CartView.vue';
import CheckoutView from '@/views/Shop/CheckoutView.vue';
import Layout from '@/layouts/Layout.vue';
import PaymentResponse from '@/views/Shop/PaymentResponse.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'products',
        name: 'Products',
        component: ProductsView,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: CartView,
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: CheckoutView,
      },
      {
        path: 'payment-success',
        name: 'PaymentSuccess',
        component: PaymentResponse,
      },
      {
        path: 'examples',
        name: 'Examples',
        component: ExamplesView,
      },
      {
        path: 'tables',
        name: 'Tables',
        component: TablesView,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
