import { defineStore } from 'pinia';
import type { ResponseValidate } from '@/types/Response/Response';

export const ToastGlobal = defineStore('toastGlobal', {
  state: (): { toast: ResponseValidate | null, actionToast: ResponseValidate | null } => ({
    toast: null,
    actionToast: null,
  }),
  actions: {
    triggerToast(toast: ResponseValidate) {
      this.toast = toast;
    },
    clearToast() {
      this.toast = null;
    },
    triggerActionToast(toast: ResponseValidate) {
      this.actionToast = toast;
    },
    clearActionToast() {
      this.actionToast = null;
    },
  },
});