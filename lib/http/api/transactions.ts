import { buildQuery } from '../build-query';
import { apiFetch } from '../apiFetch';
import type {
  TransactionResponse,
  CreateTransactionRequest,
  CreateInstallmentRequest,
  CreateRecurrentRequest,
  UpdateTransactionRequest,
  TransactionListParams,
  CalendarEvent,
  CalendarQueryParams,
  PaginatedMeta,
} from '@/types';

const BASE = 'transactions';

export async function listTransactions(params?: TransactionListParams) {
  const query = buildQuery(params);
  return apiFetch<{
    data: TransactionResponse[];
    meta: PaginatedMeta;
  }>(`${BASE}${query}`);
}

export async function getTransaction(id: string) {
  return apiFetch<{ data: TransactionResponse }>(`${BASE}/${id}`);
}

export async function listByInstallmentGroup(installmentGroupId: string) {
  return apiFetch<{ data: TransactionResponse[] }>(
    `${BASE}/by-group/${installmentGroupId}`,
  );
}

export async function getCalendarEvents(params: CalendarQueryParams) {
  const query = buildQuery(params);
  return apiFetch<{ data: CalendarEvent[] }>(`${BASE}/calendar${query}`);
}

export async function createTransaction(body: CreateTransactionRequest) {
  return apiFetch<{ data: TransactionResponse }>(BASE, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function createInstallments(body: CreateInstallmentRequest) {
  return apiFetch<{ data: TransactionResponse[] }>(`${BASE}/installments`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function createRecurrent(body: CreateRecurrentRequest) {
  return apiFetch<{ data: TransactionResponse }>(`${BASE}/recurrent`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateTransaction(
  id: string,
  body: UpdateTransactionRequest,
) {
  return apiFetch<{ data: TransactionResponse }>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function deleteTransaction(id: string, cascade?: boolean) {
  const query = cascade ? '?cascade=true' : '';
  return apiFetch<{ data: { deleted: boolean; count?: number } }>(
    `${BASE}/${id}${query}`,
    { method: 'DELETE' },
  );
}
