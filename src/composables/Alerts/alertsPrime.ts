// useAlerts.ts
import { readonly } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

export const ConfirmPosition = [
  'top',
  'bottom',
  'center',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const;
export type ConfirmPosition = typeof ConfirmPosition[number];

const defaultConfig = {
  toastLife: 3000 as const,
  confirmHeader: 'Confirmar' as const,
  confirmIcon: 'pi pi-exclamation-triangle' as const,
  confirmPosition: 'center' as const,
};
export const alertConfig = readonly(defaultConfig);

export interface ExtendedConfirmOptions {
  danger?: boolean;
  acceptLabel?: string;
  rejectLabel?: string;
  position?: ConfirmPosition;
  appendTo?: string;
  header?: string;
  icon?: string;
}

function buildOptions(
  message: string,
  options: ExtendedConfirmOptions = {}
) {
  return {
    message,
    header: options.header ?? defaultConfig.confirmHeader,
    icon: options.icon ?? defaultConfig.confirmIcon,
    appendTo: options.appendTo,
    acceptClass: options.danger ? 'p-button-danger' : undefined,
    acceptLabel: options.acceptLabel,
    rejectLabel: options.rejectLabel,
    position: options.position ?? defaultConfig.confirmPosition,
  };
}

/**
 * useAlerts debe invocarse en setup()
 */
export function useAlerts() {
  const confirm = useConfirm();
  const toast = useToast();

  function showConfirm(
    message: string,
    options?: ExtendedConfirmOptions
  ): Promise<boolean> {
    return new Promise((resolve) => {
      confirm.require({
        ...buildOptions(message, options),
        group: 'dialog', 
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

  function showPopup(
    message: string,
    options: ExtendedConfirmOptions & { target: HTMLElement }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      confirm.require({
        ...buildOptions(message, options),
        group: 'popup', // Cambia el grupo a 'popup'
        target: options.target,
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

  function showToast(
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail?: string,
    life: number = defaultConfig.toastLife
  ): void {
    toast.add({ severity, summary, detail, life });
    console.log('Toast', { severity, summary, detail, life });
  }

  function showLoadingToast(summary: string, detail?: string): void {
    toast.add({
      severity: 'info',
      summary,
      detail,
      life: 0, // indefinido; cierra con closeLoadingToast
    });
  }

  function closeLoadingToast(): void {
    if (typeof toast.removeAllGroups === 'function') {
      toast.removeAllGroups();
    } else {
      (toast as any).clear();
    }
  }

  //funcion de dialog de carga de solicitud
  function showLoadingDialog(
    message: string,
    options: ExtendedConfirmOptions = {}
  ): Promise<boolean> {
    return new Promise((resolve) => {
      confirm.require({
        ...buildOptions(message, options),
        group: 'loading', 
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

  function actionToast(
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail?: string,
    life: number = defaultConfig.toastLife
  ): void {
    toast.add({
      severity,
      summary,
      detail,
      life,
      group: 'action',
    });
  }


  return {
    showConfirm,
    showPopup,
    showToast,
    showLoadingToast,
    closeLoadingToast,
    showLoadingDialog,
    actionToast
  };
}
