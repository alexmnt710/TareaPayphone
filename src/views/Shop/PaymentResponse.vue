<template>
  <div class="payment-response p-6">
    <Card>
      <template #title>
        <span>Procesando respuesta de pago</span>
      </template>
      <template #content>
        <div v-if="loading" class="text-center">
          <ProgressSpinner />
          <p class="mt-3">Verificando transacción...</p>
        </div>

        <div v-else>
          <h2 :class="statusClass">{{ statusTitle }}</h2>
          <p>{{ message }}</p>
          <div class="mt-4">
            <Button label="Ir al inicio" @click="goHome" />
            <Button label="Ver carrito" class="ml-2" text @click="goCart" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import { useAlerts } from '@/composables/Alerts/alertsPrime';

const route = useRoute();
const router = useRouter();
const alerts = useAlerts();

const loading = ref(true);
const statusTitle = ref('Procesando');
const message = ref('Por favor espera...');
const statusClass = ref('');

const PAYPHONE_CONFIRM_URL = 'https://pay.payphonetodoesposible.com/api/button/V2/Confirm';
const PAYPHONE_TOKEN = import.meta.env.VITE_PAYPHONE_TOKEN || '';

function goHome() {
  router.push({ name: 'Home' });
}
function goCart() {
  router.push({ name: 'Cart' });
}

onMounted(async () => {
  const q = route.query;
  const id = q.id ? String(q.id) : null;
  const clientTx = q.clientTransactionId ? String(q.clientTransactionId) : null;

  if (!id || !clientTx) {
    loading.value = false;
    statusTitle.value = 'Solicitud inválida';
    message.value = 'No se recibieron los parámetros de Payphone.';
    alerts.showToast('error', 'Error', message.value);
    return;
  }

  // Llamada a Confirm
  // Si no existe token en las variables de entorno asumimos que la integración
  // solo usa el AppId en cliente y no intentamos confirmar desde frontend.
  if (!PAYPHONE_TOKEN) {
    loading.value = false;
    statusTitle.value = 'Respuesta recibida';
    message.value = 'Se recibió la respuesta del pago. Gracias por su compra.';
    alerts.showToast('success', 'Pago recibido', 'Transacción recibida.');

    // Limpiar carrito si existe
    try {
      const { useCartStore } = await import('@/stores/Shop/cartStore');
      const store = useCartStore();
      store.clearCart();
    } catch (err) {
      // ignore
    }

    // Redirigir a productos después de un breve delay
    setTimeout(() => {
      router.push({ name: 'Products' }).catch(() => {});
    }, 1200);

    return;
  }

  try {
    const body = { id: Number(id), clientTxId: clientTx };
    const res = await fetch(PAYPHONE_CONFIRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PAYPHONE_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    loading.value = false;

    if (!res.ok) {
      statusTitle.value = 'Confirmación fallida';
      message.value = data?.message || JSON.stringify(data);
      statusClass.value = 'text-red-600';
      alerts.showToast('error', 'Pago no confirmado', message.value);
      return;
    }

    // Si la respuesta indica estado de transacción
    const txStatus = data?.transactionStatus || data?.transaction?.transactionStatus || null;
    const statusCode = data?.statusCode || data?.transaction?.statusCode || null;

    if (txStatus && (txStatus === 'Approved' || statusCode === 3)) {
      statusTitle.value = 'Pago Aprobado';
      message.value = 'La transacción fue aprobada y confirmada correctamente.';
      statusClass.value = 'text-green-600';
      // Construir detalle adicional si viene en la respuesta
      const authorizationCode = data?.authorizationCode || data?.transaction?.authorizationCode || null;
      const transactionId = data?.transactionId || data?.transaction?.transactionId || null;

      let successDetail = 'Transacción aprobada. Gracias.';
      const extras: string[] = [];
      if (authorizationCode) extras.push(`Auth: ${authorizationCode}`);
      if (transactionId) extras.push(`TxID: ${transactionId}`);
      if (extras.length) successDetail = extras.join(' | ');

      alerts.showToast('success', 'Pago confirmado', successDetail);

      // Limpiar carrito
      try {
        const { useCartStore } = await import('@/stores/Shop/cartStore');
        const store = useCartStore();
        store.clearCart();
      } catch (err) {
        // ignore
      }

      // Redirigir a productos después de mostrar el toast (dar tiempo para ver la alerta)
      setTimeout(() => {
        // limpiar query params redirigiendo a Products
        router.push({ name: 'Products' }).catch(() => {});
      }, 1600);

      return;
    }

    // Si no está aprobado
    statusTitle.value = 'Transacción No Aprobada';
    message.value = data?.message || JSON.stringify(data);
    statusClass.value = 'text-yellow-600';
    alerts.showToast('warn', 'Estado de transacción', message.value);
    // redirigir a productos después de aviso
    setTimeout(() => {
      router.push({ name: 'Products' }).catch(() => {});
    }, 1600);
  } catch (error: any) {
    loading.value = false;
    statusTitle.value = 'Error de red';
    message.value = error?.message || String(error);
    statusClass.value = 'text-red-600';
    alerts.showToast('error', 'Error', message.value);
    setTimeout(() => {
      router.push({ name: 'Products' }).catch(() => {});
    }, 1600);
  }
});
</script>

<style scoped>
.payment-response {
  max-width: 900px;
  margin: 2rem auto;
}
</style>
