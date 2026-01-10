import { createApp } from 'vue';
//components
import App from './App.vue';
//css
import PrimeVue from 'primevue/config';
import customAura from './styles/aura-fucsia-custom';
//prime flex
import 'primeflex/primeflex.css';
//tailwind
import './styles/css/output.css';
import './assets/layout/variables/borders.css';
import './assets/layout/variables/logos.css';
import './assets/layout/variables/sidebar.css';
import './styles/css/theme-var.css';
//router
import router from './router/index';
//store
import { createPinia } from 'pinia';
//composables
import { initApp } from './composables/System/initApp';
//plugins
import primeComponents from './plugins/primeComponents';

const pinia = createPinia();
const app = createApp(App);


app.use(PrimeVue, {
  theme: {
    preset: customAura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
});

app.use(router);
app.use(pinia);
app.use(primeComponents);


// Montar la aplicación primero, luego inicializarla
app.mount('#app');
initApp();
