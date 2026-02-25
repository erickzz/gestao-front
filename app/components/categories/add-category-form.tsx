"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateCategoryResult } from "@/app/(protected)/categories/actions";

const COLOR_PRESETS = [
  "#EF4444",
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
  "#84CC16",
  "#6B7280",
];

interface AddCategoryFormProps {
  createAction: (
    prevState: CreateCategoryResult | null,
    formData: FormData,
  ) => Promise<CreateCategoryResult>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddCategoryForm({
  createAction,
  onSuccess,
  onCancel,
}: AddCategoryFormProps) {
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
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          placeholder="Ex: Alimentação"
          required
        />
        {state?.errors?.name?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.name._errors[0]}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Cor</Label>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="color"
            id="color"
            name="color"
            defaultValue="#3B82F6"
            className="h-10 w-14 cursor-pointer rounded border border-input bg-transparent p-1"
          />
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={(e) => {
                  const input = e.currentTarget
                    .closest("form")
                    ?.querySelector<HTMLInputElement>('input[name="color"]');
                  if (input) input.value = color;
                }}
                className="h-8 w-8 rounded-md border-2 border-transparent transition-colors hover:border-foreground/50"
                style={{ backgroundColor: color }}
                aria-label={`Cor ${color}`}
              />
            ))}
          </div>
        </div>
        {state?.errors?.color?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.color._errors[0]}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <select
          id="type"
          name="type"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Selecione...</option>
          <option value="EXPENSE">Despesa</option>
          <option value="INCOME">Receita</option>
        </select>
        {state?.errors?.type?._errors?.[0] && (
          <p className="text-sm text-destructive">
            {state.errors.type._errors[0]}
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
