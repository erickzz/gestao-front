"use server";

import { revalidateTag } from "next/cache";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/http/api/transactions";
import { parseFormData } from "@/lib/utils/form";
import { REVALIDATE_TAGS } from "@/lib/revalidate-tags";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "./transaction-schema";

export type CreateTransactionResult = {
  success: boolean;
  message: string;
  errors: Record<string, { _errors: string[] }> | null;
};

export type DeleteTransactionResult = {
  success: boolean;
  message: string;
};

export async function createTransactionAction(
  _prevState: CreateTransactionResult | null,
  formData: FormData,
): Promise<CreateTransactionResult> {
  const result = createTransactionSchema.safeParse(parseFormData(formData));

  if (!result.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: result.error.format() as unknown as Record<
        string,
        { _errors: string[] }
      >,
    };
  }

  try {
    await createTransaction({
      ...result.data,
      recurrence: "NONE",
    });
    revalidateTag(REVALIDATE_TAGS.transactions, "max");
    return { success: true, message: "Transação criada", errors: null };
  } catch (err) {
    if (err instanceof Error && "response" in err) {
      const res = (err as { response: Response }).response;
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        message:
          (body as { message?: string }).message ?? "Erro na requisição",
        errors: null,
      };
    }
    return {
      success: false,
      message:
        "Um erro inesperado aconteceu. Tente novamente em alguns instantes.",
      errors: null,
    };
  }
}

export async function updateTransactionAction(
  _prevState: CreateTransactionResult | null,
  formData: FormData,
): Promise<CreateTransactionResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return {
      success: false,
      message: "ID da transação é obrigatório",
      errors: null,
    };
  }

  const parsed = parseFormData(formData);
  delete (parsed as Record<string, unknown>).id;
  const result = updateTransactionSchema.safeParse(parsed);

  if (!result.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: result.error.format() as unknown as Record<
        string,
        { _errors: string[] }
      >,
    };
  }

  try {
    await updateTransaction(id, result.data);
    revalidateTag(REVALIDATE_TAGS.transactions, "max");
    return { success: true, message: "Transação atualizada", errors: null };
  } catch (err) {
    if (err instanceof Error && "response" in err) {
      const res = (err as { response: Response }).response;
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        message:
          (body as { message?: string }).message ?? "Erro na requisição",
        errors: null,
      };
    }
    return {
      success: false,
      message:
        "Um erro inesperado aconteceu. Tente novamente em alguns instantes.",
      errors: null,
    };
  }
}

export async function deleteTransactionAction(
  _prevState: DeleteTransactionResult | null,
  formData: FormData,
): Promise<DeleteTransactionResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { success: false, message: "ID da transação é obrigatório" };
  }

  try {
    await deleteTransaction(id);
    revalidateTag(REVALIDATE_TAGS.transactions, "max");
    return { success: true, message: "Transação excluída" };
  } catch (err) {
    if (err instanceof Error && "response" in err) {
      const res = (err as { response: Response }).response;
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        message:
          (body as { message?: string }).message ?? "Erro na requisição",
      };
    }
    return {
      success: false,
      message:
        "Um erro inesperado aconteceu. Tente novamente em alguns instantes.",
    };
  }
}
