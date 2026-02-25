"use server";

import { revalidateTag } from "next/cache";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/http/api/categories";
import { parseFormData } from "@/lib/utils/form";
import { REVALIDATE_TAGS } from "@/lib/revalidate-tags";
import { categorySchema } from "./category-schema";

export type CreateCategoryResult = {
  success: boolean;
  message: string;
  errors: Record<string, { _errors: string[] }> | null;
};

export type DeleteCategoryResult = {
  success: boolean;
  message: string;
};

export async function createCategoryAction(
  _prevState: CreateCategoryResult | null,
  formData: FormData,
): Promise<CreateCategoryResult> {
  const result = categorySchema.safeParse(parseFormData(formData));

  if (!result.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: result.error.format() as unknown as Record<string, { _errors: string[] }>,
    };
  }

  try {
    await createCategory(result.data);
    revalidateTag(REVALIDATE_TAGS.categories, "max");
    return { success: true, message: "Categoria criada", errors: null };
  } catch (err) {
    if (err instanceof Error && "response" in err) {
      const res = (err as { response: Response }).response;
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        message: (body as { message?: string }).message ?? "Erro na requisição",
        errors: null,
      };
    }
    return {
      success: false,
      message: "Um erro inesperado aconteceu. Tente novamente em alguns instantes.",
      errors: null,
    };
  }
}

export async function updateCategoryAction(
  _prevState: CreateCategoryResult | null,
  formData: FormData,
): Promise<CreateCategoryResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return {
      success: false,
      message: "ID da categoria é obrigatório",
      errors: null,
    };
  }

  const result = categorySchema.safeParse(parseFormData(formData));

  if (!result.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: result.error.format() as unknown as Record<string, { _errors: string[] }>,
    };
  }

  try {
    await updateCategory(id, result.data);
    revalidateTag(REVALIDATE_TAGS.categories, "max");
    return { success: true, message: "Categoria atualizada", errors: null };
  } catch (err) {
    if (err instanceof Error && "response" in err) {
      const res = (err as { response: Response }).response;
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        message: (body as { message?: string }).message ?? "Erro na requisição",
        errors: null,
      };
    }
    return {
      success: false,
      message: "Um erro inesperado aconteceu. Tente novamente em alguns instantes.",
      errors: null,
    };
  }
}

export async function deleteCategoryAction(
  _prevState: DeleteCategoryResult | null,
  formData: FormData,
): Promise<DeleteCategoryResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { success: false, message: "ID da categoria é obrigatório" };
  }

  try {
    await deleteCategory(id);
    revalidateTag(REVALIDATE_TAGS.categories, "max");
    return { success: true, message: "Categoria excluída" };
  } catch (err) {
    if (err instanceof Error && "response" in err) {
      const res = (err as { response: Response }).response;
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        message: (body as { message?: string }).message ?? "Erro na requisição",
      };
    }
    return {
      success: false,
      message: "Um erro inesperado aconteceu. Tente novamente em alguns instantes.",
    };
  }
}
