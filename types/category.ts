import type { TransactionType } from './enums';

export interface CategoryResponse {
  id: string;
  name: string;
  color: string;
  type: TransactionType;
  userId: string | null;
}

export interface CreateCategoryRequest {
  name: string;
  color: string;
  type: TransactionType;
}

export interface UpdateCategoryRequest {
  name?: string;
  color?: string;
  type?: TransactionType;
}
