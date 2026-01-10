// src/services/payphone.service.ts
import type {
  PayphonePaymentRequest,
  PayphonePaymentResponse,
  PayphoneTransaction,
} from '@/types/examples';
import api from '@/utils/Global/axios';

/**
 * Servicio para integración con Payphone
 * Documentación: https://payphone.app/docs
 */
class PayphoneService {
  private readonly token: string = 'YOUR_PAYPHONE_TOKEN'; // Configurar en .env
  private readonly baseURL: string = 'https://pay.payphonetodoesposible.com';

  /**
   * Crear un link de pago
   */
  async createPaymentLink(
    request: PayphonePaymentRequest
  ): Promise<PayphonePaymentResponse> {
    try {
      const response = await api.post<PayphonePaymentResponse>(
        `${this.baseURL}/api/button/Prepare`,
        {
          ...request,
          token: this.token,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al crear link de pago:', error);
      throw error;
    }
  }

  /**
   * Verificar el estado de una transacción
   */
  async verifyTransaction(transactionId: string): Promise<PayphoneTransaction> {
    try {
      const response = await api.post<PayphoneTransaction>(
        `${this.baseURL}/api/button/V2/Confirm`,
        {
          id: transactionId,
          token: this.token,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al verificar transacción:', error);
      throw error;
    }
  }

  /**
   * Cancelar una transacción
   */
  async cancelTransaction(transactionId: string): Promise<any> {
    try {
      const response = await api.post(
        `${this.baseURL}/api/button/V2/Cancel`,
        {
          id: transactionId,
          token: this.token,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al cancelar transacción:', error);
      throw error;
    }
  }

  /**
   * Generar un ID de transacción único
   */
  generateClientTransactionId(): string {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Formatear monto para Payphone (debe ser sin decimales, en centavos)
   */
  formatAmount(amount: number): number {
    return Math.round(amount * 100);
  }
}

export const payphoneService = new PayphoneService();
