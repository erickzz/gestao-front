"use client";

import { useActionState, useEffect, useState } from "react";
import type { CategoryResponse, PaymentMethodItem } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateTransactionResult } from "@/app/(protected)/transactions/actions";

interface AddTransactionFormProps {
  createAction: (
    prevState: CreateTransactionResult | null,
    formData: FormData,
  ) => Promise<CreateTransactionResult>;
  categories: CategoryResponse[];
  paymentMethods: PaymentMethodItem[];
  defaultDate?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddTransactionForm({
  createAction,
  categories,
  paymentMethods,
  defaultDate,
  onSuccess,
  onCancel,
}: AddTransactionFormProps) {
  const [state, formAction] = useActionState(createAction, null);
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

  const filteredCategories = categories.filter((c) => c.type === type);

  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  const today = defaultDate ?? new Date().toISOString().split("T")[0];

  return (
    <form action={formAction} className="space-y-4">
      {state && !state.success && state.message && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <select
          id="type"
          name="type"
          required
          value={type}
          onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="EXPENSE">Despesa</option>
          <option value="INCOME">Receita</option>
        </select>
        {state?.errors?.type?._errors?.[0] && (
          <p className="text-sm text-destructive">{state.errors.type._errors[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoryId">Categoria</Label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Selecione...</option>
          {filteredCategories.map((cat) => (
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
          <Label htmlFor="value">Valor (R$)</Label>
          <Input
            id="value"
            name="value"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            required
          />
          {state?.errors?.value?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {state.errors.value._errors[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={today}
            required
          />
          {state?.errors?.date?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {state.errors.date._errors[0]}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Forma de pagamento</Label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Selecione...</option>
          {paymentMethods.map((pm) => (
            <option key={pm.value} value={pm.value}>
              {pm.label}
            </option>
          ))}
        </select>
        {state?.errors?.paymentMethod?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.paymentMethod._errors[0]}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          placeholder="Ex: Supermercado, Salário..."
          required
        />
        {state?.errors?.description?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.description._errors[0]}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subcategory">Subcategoria (opcional)</Label>
        <Input
          id="subcategory"
          name="subcategory"
          placeholder="Ex: Alimentação básica"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="PAID">Pago</option>
          <option value="PENDING">Pendente</option>
        </select>
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
