"use client";

import type { TransactionResponse, CategoryResponse, PaymentMethodItem } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditTransactionForm } from "./edit-transaction-form";
import type {
  CreateTransactionResult,
  DeleteTransactionResult,
} from "@/app/(protected)/transactions/actions";

interface EditTransactionDialogProps {
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTransactionDialog({
  transaction,
  categories,
  paymentMethods,
  updateAction,
  deleteAction,
  open,
  onOpenChange,
}: EditTransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar transação</DialogTitle>
        </DialogHeader>
        <EditTransactionForm
          transaction={transaction}
          categories={categories}
          paymentMethods={paymentMethods}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
