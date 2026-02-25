"use client";

import { useState } from "react";
import type { BudgetResponse, CategoryResponse } from "@/types";
import { formatCurrency, formatMonthName } from "@/lib/utils/format";
import { EditBudgetDialog } from "./edit-budget-dialog";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex cursor-pointer items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-4 py-2.5 transition-colors hover:bg-secondary/50"
      >
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
      </div>
      <EditBudgetDialog
        budget={budget}
        expenseCategories={expenseCategories}
        updateAction={updateAction}
        deleteAction={deleteAction}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
