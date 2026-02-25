import { apiFetch } from '../apiFetch';
import type { CategoryResponse, CreateCategoryRequest } from '@/types';

export async function createAdminCategory(body: CreateCategoryRequest) {
  return apiFetch<{ data: CategoryResponse }>('admin/categories', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
