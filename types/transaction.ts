import type { CategoryResponse } from './category';
import type {
  PaymentMethod,
  Recurrence,
  TransactionStatus,
  TransactionType,
} from './enums';

export interface TransactionResponse {
  id: string;
  userId: string;
  categoryId: string;
  category: CategoryResponse;
  type: TransactionType;
  value: number;
  date: string;
  subcategory: string | null;
  paymentMethod: PaymentMethod;
  description: string;
  recurrence: Recurrence;
  status: TransactionStatus;
  installmentGroupId: string | null;
  installmentNumber: number | null;
  installmentCount: number | null;
  createdAt: string;
}

export interface CreateTransactionRequest {
  categoryId: string;
  type: TransactionType;
  value: number;
  date: string;
  subcategory?: string;
  paymentMethod: PaymentMethod;
  description: string;
  status?: TransactionStatus;
  recurrence?: 'NONE';
}

export interface CreateInstallmentRequest {
  categoryId: string;
  type: TransactionType;
  totalValue: number;
  installmentCount: number;
  firstDueDate: string;
  subcategory?: string;
  paymentMethod: PaymentMethod;
  description: string;
  status?: TransactionStatus;
}

export interface CreateRecurrentRequest {
  categoryId: string;
  type: TransactionType;
  value: number;
  date: string;
  subcategory?: string;
  paymentMethod: PaymentMethod;
  description: string;
  recurrence: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  status?: TransactionStatus;
}

export interface UpdateTransactionRequest {
  categoryId?: string;
  value?: number;
  date?: string;
  subcategory?: string;
  paymentMethod?: PaymentMethod;
  description?: string;
  status?: TransactionStatus;
}

export interface TransactionListParams {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  type?: TransactionType;
}
