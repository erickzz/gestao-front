"use server";

import { revalidateTag } from "next/cache";
import { createTransaction } from "@/lib/http/api/transactions";
import { parseFormData } from "@/lib/utils/form";
import { REVALIDATE_TAGS } from "@/lib/revalidate-tags";
import { createTransactionSchema } from "./transaction-schema";

export type CreateTransactionResult = {
  success: boolean;
  message: string;
  errors: Record<string, { _errors: string[] }> | null;
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
