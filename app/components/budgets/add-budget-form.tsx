"use client";

import { useActionState, useEffect } from "react";
import type { CategoryResponse } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MONTHS } from "@/lib/constants/months";
import type { CreateBudgetResult } from "@/app/(protected)/budgets/actions";

interface AddBudgetFormProps {
  createAction: (
    prevState: CreateBudgetResult | null,
    formData: FormData,
  ) => Promise<CreateBudgetResult>;
  expenseCategories: CategoryResponse[];
  month: number;
  year: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddBudgetForm({
  createAction,
  expenseCategories,
  month,
  year,
  onSuccess,
  onCancel,
}: AddBudgetFormProps) {
  const [state, formAction] = useActionState(createAction, null);

  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      {state && !state.success && state.message && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="categoryId">Categoria</Label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Selecione...</option>
          {expenseCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {state?.errors?.categoryId?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.categoryId._errors[0]}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="month">Mês</Label>
          <select
            id="month"
            name="month"
            required
            defaultValue={month}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {state?.errors?.month?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {state.errors.month._errors[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Input
            id="year"
            name="year"
            type="number"
            min={2000}
            max={2100}
            defaultValue={year}
            required
          />
          {state?.errors?.year?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {state.errors.year._errors[0]}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="limit">Limite (R$)</Label>
        <Input
          id="limit"
          name="limit"
          type="number"
          min={0}
          step="0.01"
          placeholder="0,00"
          required
        />
        {state?.errors?.limit?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.limit._errors[0]}
          </p>
        )}
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Criar</Button>
      </DialogFooter>
    </form>
  );
}
