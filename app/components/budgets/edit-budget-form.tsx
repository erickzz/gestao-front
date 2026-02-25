"use client";

import { useActionState, useEffect, useState } from "react";
import type { BudgetResponse, CategoryResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MONTHS } from "@/lib/constants/months";
import type {
  CreateBudgetResult,
  DeleteBudgetResult,
} from "@/app/(protected)/budgets/actions";

interface EditBudgetFormProps {
  budget: BudgetResponse;
  expenseCategories: CategoryResponse[];
  updateAction: (
    prevState: CreateBudgetResult | null,
    formData: FormData,
  ) => Promise<CreateBudgetResult>;
  deleteAction: (
    prevState: DeleteBudgetResult | null,
    formData: FormData,
  ) => Promise<DeleteBudgetResult>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditBudgetForm({
  budget,
  expenseCategories,
  updateAction,
  deleteAction,
  onSuccess,
  onCancel,
}: EditBudgetFormProps) {
  const [updateState, updateFormAction] = useActionState(updateAction, null);
  const [deleteState, deleteFormAction] = useActionState(deleteAction, null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (updateState?.success && onSuccess) {
      onSuccess();
    }
  }, [updateState?.success, onSuccess]);

  useEffect(() => {
    if (deleteState?.success && onSuccess) {
      setDeleteDialogOpen(false);
      onSuccess();
    }
  }, [deleteState?.success, onSuccess]);

  return (
    <>
      <form action={updateFormAction} className="space-y-4">
        <input type="hidden" name="id" value={budget.id} />
        {updateState && !updateState.success && updateState.message && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {updateState.message}
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="edit-categoryId">Categoria</Label>
          <select
            id="edit-categoryId"
            name="categoryId"
            required
            defaultValue={budget.categoryId}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione...</option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {updateState?.errors?.categoryId?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.categoryId._errors[0]}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-month">Mês</Label>
            <select
              id="edit-month"
              name="month"
              required
              defaultValue={budget.month}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            {updateState?.errors?.month?._errors?.[0] && (
              <p className="text-sm text-destructive">
                {updateState.errors.month._errors[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-year">Ano</Label>
            <Input
              id="edit-year"
              name="year"
              type="number"
              min={2000}
              max={2100}
              defaultValue={budget.year}
              required
            />
            {updateState?.errors?.year?._errors?.[0] && (
              <p className="text-sm text-destructive">
                {updateState.errors.year._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-limit">Limite (R$)</Label>
          <Input
            id="edit-limit"
            name="limit"
            type="number"
            min={0}
            step="0.01"
            placeholder="0,00"
            defaultValue={budget.limit}
            required
          />
          {updateState?.errors?.limit?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.limit._errors[0]}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Excluir
          </Button>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir orçamento?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteState && !deleteState.success && deleteState.message && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {deleteState.message}
            </p>
          )}
          <form action={deleteFormAction}>
            <input type="hidden" name="id" value={budget.id} />
            <AlertDialogFooter>
              <AlertDialogCancel type="button">
                Cancelar
              </AlertDialogCancel>
              <Button type="submit" variant="destructive">
                Excluir
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
