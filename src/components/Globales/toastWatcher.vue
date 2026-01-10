<template>

</template>

<script setup lang="ts">
import { watch } from 'vue';
//import { useToast } from 'primevue';
import { ToastGlobal } from '@/stores/System/toastGlobal';
import { useAlerts } from '@/composables/Alerts/alertsPrime';

const alerts = useAlerts();
const alertStore = ToastGlobal()

const defaultSummaryBySeverity: Record<'success' | 'info' | 'warn' | 'error', string> = {
  success: 'Éxito',
  info: 'Info',
  warn: 'Atención',
  error: 'Error',
};

watch(() => alertStore.toast, (newToast) => {
  if (newToast) {
    alerts.showToast(
      newToast.icon,
      defaultSummaryBySeverity[newToast.icon],
      newToast.message  ||'',
      newToast.life 
    );
    alertStore.clearToast();
  }
});
watch(() => alertStore.actionToast, (newToast) => {
  if (newToast) {
    alerts.actionToast(
      newToast.icon,
      defaultSummaryBySeverity[newToast.icon],
      newToast.message  ||'',
      newToast.life
    );
    alertStore.clearActionToast();
  }
});
</script>