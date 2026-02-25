import { cacheLife, cacheTag } from 'next/cache';
import { apiFetch } from '../apiFetch';
import type {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types';
import { REVALIDATE_TAGS } from '@/lib/revalidate-tags';

const BASE = 'categories';

export async function listCategories(type?: 'INCOME' | 'EXPENSE') {
  'use cache: private';
  cacheTag(REVALIDATE_TAGS.categories);
  cacheLife({ stale: 60 });
  const params = type ? `?type=${type}` : '';
  return apiFetch<{ data: CategoryResponse[] }>(`${BASE}${params}`);
}

export async function getCategory(id: string) {
  return apiFetch<{ data: CategoryResponse }>(`${BASE}/${id}`);
}

export async function createCategory(body: CreateCategoryRequest) {
  return apiFetch<{ data: CategoryResponse }>(BASE, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateCategory(id: string, body: UpdateCategoryRequest) {
  return apiFetch<{ data: CategoryResponse }>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function deleteCategory(id: string) {
  return apiFetch<{ data: unknown }>(`${BASE}/${id}`, {
    method: 'DELETE',
  });
}
