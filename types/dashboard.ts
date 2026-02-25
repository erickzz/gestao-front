import type { BudgetAlert } from './enums';

export interface DashboardSummary {
  balance: number;
  income: number;
  expenses: number;
  incomeDelta: number;
  expensesDelta: number;
}

export interface ExpenseByCategory {
  categoryId: string;
  name: string;
  color: string;
  total: number;
}

export interface MonthlyEvolutionItem {
  month: number;
  year: number;
  income: number;
  expenses: number;
}

export interface BudgetStatusItem {
  budgetId: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  limit: number;
  spent: number;
  percentUsed: number;
  alert: BudgetAlert;
}

export interface DashboardAggregated {
  summary: DashboardSummary;
  expensesByCategory: ExpenseByCategory[];
  monthlyEvolution: MonthlyEvolutionItem[];
  budgetStatus: BudgetStatusItem[];
}

export interface DashboardSummaryParams {
  month: number;
  year: number;
}

export interface DashboardExpensesByCategoryParams {
  month: number;
  year: number;
}

export interface DashboardBudgetStatusParams {
  month: number;
  year: number;
}

export interface DashboardMonthlyEvolutionParams {
  months?: number;
}

export interface DashboardAggregatedParams {
  month: number;
  year: number;
  months?: number;
}
