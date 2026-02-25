"use client";

import { useActionState, useEffect, useState } from "react";
import type { TransactionResponse, CategoryResponse, PaymentMethodItem } from "@/types";
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
import type {
  CreateTransactionResult,
  DeleteTransactionResult,
} from "@/app/(protected)/transactions/actions";

interface EditTransactionFormProps {
  transaction: TransactionResponse;
  categories: CategoryResponse[];
  paymentMethods: PaymentMethodItem[];
  updateAction: (
    prevState: CreateTransactionResult | null,
    formData: FormData,
  ) => Promise<CreateTransactionResult>;
  deleteAction: (
    prevState: DeleteTransactionResult | null,
    formData: FormData,
  ) => Promise<DeleteTransactionResult>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditTransactionForm({
  transaction,
  categories,
  paymentMethods,
  updateAction,
  deleteAction,
  onSuccess,
  onCancel,
}: EditTransactionFormProps) {
  const [updateState, updateFormAction] = useActionState(updateAction, null);
  const [deleteState, deleteFormAction] = useActionState(deleteAction, null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredCategories = categories.filter((c) => c.type === transaction.type);

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
        <input type="hidden" name="id" value={transaction.id} />
        {updateState && !updateState.success && updateState.message && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {updateState.message}
          </p>
        )}
        <div className="space-y-2">
          <Label>Tipo</Label>
          <p className="text-sm text-muted-foreground">
            {transaction.type === "INCOME" ? "Receita" : "Despesa"}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-categoryId">Categoria</Label>
          <select
            id="edit-categoryId"
            name="categoryId"
            required
            defaultValue={transaction.categoryId}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione...</option>
            {filteredCategories.map((cat) => (
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
            <Label htmlFor="edit-value">Valor (R$)</Label>
            <Input
              id="edit-value"
              name="value"
              type="number"
              min="0.01"
              step="0.01"
              required
              defaultValue={transaction.value}
            />
            {updateState?.errors?.value?._errors?.[0] && (
              <p className="text-sm text-destructive">
                {updateState.errors.value._errors[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-date">Data</Label>
            <Input
              id="edit-date"
              name="date"
              type="date"
              required
              defaultValue={transaction.date.split("T")[0]}
            />
            {updateState?.errors?.date?._errors?.[0] && (
              <p className="text-sm text-destructive">
                {updateState.errors.date._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-paymentMethod">Forma de pagamento</Label>
          <select
            id="edit-paymentMethod"
            name="paymentMethod"
            required
            defaultValue={transaction.paymentMethod}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione...</option>
            {paymentMethods.map((pm) => (
              <option key={pm.value} value={pm.value}>
                {pm.label}
              </option>
            ))}
          </select>
          {updateState?.errors?.paymentMethod?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.paymentMethod._errors[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-description">Descrição</Label>
          <Input
            id="edit-description"
            name="description"
            required
            defaultValue={transaction.description}
          />
          {updateState?.errors?.description?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.description._errors[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-subcategory">Subcategoria (opcional)</Label>
          <Input
            id="edit-subcategory"
            name="subcategory"
            defaultValue={transaction.subcategory ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-status">Status</Label>
          <select
            id="edit-status"
            name="status"
            defaultValue={transaction.status}
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
            <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
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
            <input type="hidden" name="id" value={transaction.id} />
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
