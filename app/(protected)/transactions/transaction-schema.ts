import { z } from "zod";

const transactionTypeSchema = z.enum(["INCOME", "EXPENSE"]);
const paymentMethodSchema = z.enum([
  "PIX",
  "CREDIT_CARD",
  "DEBIT_CARD",
  "CASH",
  "BANK_TRANSFER",
  "BOLETO",
  "OTHER",
]);

export const createTransactionSchema = z.object({
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  type: transactionTypeSchema,
  value: z.coerce.number().positive("Valor deve ser maior que zero"),
  date: z.string().min(1, "Data é obrigatória"),
  subcategory: z.string().optional(),
  paymentMethod: paymentMethodSchema,
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.enum(["PAID", "PENDING"]).optional(),
});

export const updateTransactionSchema = z.object({
  categoryId: z.string().min(1).optional(),
  value: z.coerce.number().positive().optional(),
  date: z.string().min(1).optional(),
  subcategory: z.string().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  description: z.string().min(1).optional(),
  status: z.enum(["PAID", "PENDING"]).optional(),
});

export type CreateTransactionFormInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormInput = z.infer<typeof updateTransactionSchema>;
