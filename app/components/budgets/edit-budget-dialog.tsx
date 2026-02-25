"use client";

import type { BudgetResponse, CategoryResponse } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditBudgetForm } from "./edit-budget-form";
import type {
  CreateBudgetResult,
  DeleteBudgetResult,
} from "@/app/(protected)/budgets/actions";

interface EditBudgetDialogProps {
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBudgetDialog({
  budget,
  expenseCategories,
  updateAction,
  deleteAction,
  open,
  onOpenChange,
}: EditBudgetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar orçamento</DialogTitle>
        </DialogHeader>
        <EditBudgetForm
          budget={budget}
          expenseCategories={expenseCategories}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
