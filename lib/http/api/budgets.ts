import { cacheLife, cacheTag } from 'next/cache';
import { buildQuery } from '../build-query';
import { apiFetch } from '../apiFetch';
import type {
  BudgetResponse,
  CreateBudgetRequest,
  UpdateBudgetRequest,
  BudgetListParams,
} from '@/types';
import { REVALIDATE_TAGS } from '@/lib/revalidate-tags';

const BASE = 'budgets';

export async function listBudgets(params?: BudgetListParams) {
  'use cache: private';
  cacheTag(REVALIDATE_TAGS.budgets);
  cacheLife({ stale: 60 });
  const query = buildQuery(params);
  return apiFetch<{ data: BudgetResponse[] }>(`${BASE}${query}`);
}

export async function getBudget(id: string) {
  return apiFetch<{ data: BudgetResponse }>(`${BASE}/${id}`);
}

export async function createBudget(body: CreateBudgetRequest) {
  return apiFetch<{ data: BudgetResponse }>(BASE, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateBudget(id: string, body: UpdateBudgetRequest) {
  return apiFetch<{ data: BudgetResponse }>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function deleteBudget(id: string) {
  return apiFetch<{ data: unknown }>(`${BASE}/${id}`, {
    method: 'DELETE',
  });
}
