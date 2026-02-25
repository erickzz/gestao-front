"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { CategoryResponse } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddBudgetForm } from "./add-budget-form";
import type { CreateBudgetResult } from "@/app/(protected)/budgets/actions";

interface AddBudgetDialogProps {
  createAction: (
    prevState: CreateBudgetResult | null,
    formData: FormData,
  ) => Promise<CreateBudgetResult>;
  expenseCategories: CategoryResponse[];
  month: number;
  year: number;
}

export function AddBudgetDialog({
  createAction,
  expenseCategories,
  month,
  year,
}: AddBudgetDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Novo orçamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo orçamento</DialogTitle>
        </DialogHeader>
        <AddBudgetForm
          createAction={createAction}
          expenseCategories={expenseCategories}
          month={month}
          year={year}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
