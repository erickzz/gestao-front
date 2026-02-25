import { apiFetch } from '../apiFetch';
import type { PaymentMethodItem } from '@/types';

export async function listPaymentMethods() {
  return apiFetch<{ data: PaymentMethodItem[] }>('payment-methods');
}
