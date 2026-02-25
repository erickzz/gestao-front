import { z } from "zod";

export const budgetSchema = z.object({
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  month: z.coerce.number().int().min(1, "Mês inválido").max(12, "Mês inválido"),
  year: z
    .coerce
    .number()
    .int()
    .min(2000, "Ano inválido")
    .max(2100, "Ano inválido"),
  limit: z.coerce.number().min(0, "Limite deve ser maior ou igual a zero"),
});

export type BudgetFormInput = z.infer<typeof budgetSchema>;
