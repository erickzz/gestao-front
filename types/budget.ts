import type { CategoryResponse } from './category';

export interface BudgetResponse {
  id: string;
  userId: string;
  categoryId: string;
  category: CategoryResponse;
  month: number;
  year: number;
  limit: number;
  createdAt: string;
}

export interface CreateBudgetRequest {
  categoryId: string;
  month: number;
  year: number;
  limit: number;
}

export interface UpdateBudgetRequest {
  categoryId?: string;
  month?: number;
  year?: number;
  limit?: number;
}

export interface BudgetListParams {
  month?: number;
  year?: number;
}
