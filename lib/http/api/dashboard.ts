import { buildQuery } from '../build-query';
import { apiFetch } from '../apiFetch';
import type {
  DashboardSummary,
  ExpenseByCategory,
  MonthlyEvolutionItem,
  BudgetStatusItem,
  DashboardAggregated,
} from '@/types';

const BASE = 'dashboard';

export async function getAggregated(params: {
  month: number;
  year: number;
  months?: number;
}) {
  const query = buildQuery(params);
  return apiFetch<{ data: DashboardAggregated }>(`${BASE}${query}`);
}

export async function getSummary(params: { month: number; year: number }) {
  const query = buildQuery(params);
  return apiFetch<{ data: DashboardSummary }>(`${BASE}/summary${query}`);
}

export async function getExpensesByCategory(params: {
  month: number;
  year: number;
}) {
  const query = buildQuery(params);
  return apiFetch<{ data: ExpenseByCategory[] }>(
    `${BASE}/expenses-by-category${query}`,
  );
}

export async function getMonthlyEvolution(params?: { months?: number }) {
  const query = params?.months ? buildQuery({ months: params.months }) : '';
  return apiFetch<{ data: MonthlyEvolutionItem[] }>(
    `${BASE}/monthly-evolution${query}`,
  );
}

export async function getBudgetStatus(params: { month: number; year: number }) {
  const query = buildQuery(params);
  return apiFetch<{ data: BudgetStatusItem[] }>(
    `${BASE}/budget-status${query}`,
  );
}
