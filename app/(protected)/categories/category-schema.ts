import { z } from "zod";

const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  color: z
    .string()
    .min(1, "Cor é obrigatória")
    .regex(hexColorRegex, "Cor deve ser um hex válido (ex: #3B82F6)"),
  type: z.enum(["INCOME", "EXPENSE"], {
    required_error: "Tipo é obrigatório",
  }),
});

export type CategoryFormInput = z.infer<typeof categorySchema>;
