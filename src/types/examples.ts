// src/types/examples.ts

/**
 * Interfaz de ejemplo para un Usuario
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Usuario';
  status: 'Activo' | 'Inactivo';
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interfaz de ejemplo para un Producto
 */
export interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
  active?: boolean;
}

/**
 * Interfaz para producto en carrito
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Interfaz para la transacción de Payphone
 * Documentación: https://payphone.app/docs
 */
export interface PayphoneTransaction {
  id: string;
  amount: number;
  amountWithTax: number;
  amountWithoutTax: number;
  tax: number;
  service: number;
  tip: number;
  currency: string;
  clientTransactionId: string;
  transactionId: string;
  statusCode: number;
  status: string;
  email?: string;
  cardType?: string;
  cardBrand?: string;
  cardNumber?: string;
  reference?: string;
  phoneNumber?: string;
  lastFourDigits?: string;
}

/**
 * Interfaz para solicitud de pago a Payphone
 */
export interface PayphonePaymentRequest {
  amount: number;
  amountWithoutTax: number;
  amountWithTax?: number;
  currency: string;
  clientTransactionId: string;
  reference: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  documentId?: string;
  tax?: number;
  service?: number;
  tip?: number;
}

/**
 * Interfaz para respuesta de Payphone al crear link de pago
 */
export interface PayphonePaymentResponse {
  statusCode: number;
  message: string;
  paymentId: string;
  transactionId: string;
  payWithCard?: string;
  clientTransactionId?: string;
}

/**
 * Interfaz para orden de compra
 */
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled' | 'failed';
  paymentId?: string;
  transactionId?: string;
  clientTransactionId?: string;
  createdAt: Date;
  customerEmail?: string;
  customerPhone?: string;
}

/**
 * Interfaz genérica para respuestas de API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Interfaz para respuestas paginadas
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message?: string;
}

/**
 * Tipo para opciones de Select/Dropdown
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
}

/**
 * Interfaz para filtros de tabla
 */
export interface TableFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  [key: string]: any;
}
