"use client";

import type { BudgetResponse, CategoryResponse } from "@/types";
import { formatCurrency, formatMonthName } from "@/lib/utils/format";
import { EditableListItem } from "@/components/ui/editable-list-item";
import { EditBudgetForm } from "./edit-budget-form";
import type {
  CreateBudgetResult,
  DeleteBudgetResult,
} from "@/app/(protected)/budgets/actions";

interface BudgetListItemProps {
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
}

export function BudgetListItem({
  budget,
  expenseCategories,
  updateAction,
  deleteAction,
}: BudgetListItemProps) {
  return (
    <EditableListItem
      dialogTitle="Editar orçamento"
      className="justify-between"
      renderContent={() => (
        <>
          <div className="flex items-center gap-3">
            <div
              className="h-6 w-6 shrink-0 rounded-md"
              style={{ backgroundColor: budget.category.color }}
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {budget.category.name}
              </p>
              <p className="text-xs capitalize text-muted-foreground">
                {formatMonthName(budget.month, budget.year)} {budget.year}
              </p>
            </div>
          </div>
          <p className="text-sm font-semibold text-foreground">
            {formatCurrency(budget.limit)}
          </p>
        </>
      )}
      renderForm={(close) => (
        <EditBudgetForm
          budget={budget}
          expenseCategories={expenseCategories}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onSuccess={close}
          onCancel={close}
        />
      )}
    />
  );
}
