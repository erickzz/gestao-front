"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTransactionForm } from "./add-transaction-form";
import type { CreateTransactionResult } from "@/app/(protected)/transactions/actions";
import type { CategoryResponse, PaymentMethodItem } from "@/types";

interface AddTransactionDialogProps {
  createAction: (
    prevState: CreateTransactionResult | null,
    formData: FormData,
  ) => Promise<CreateTransactionResult>;
  categories: CategoryResponse[];
  paymentMethods: PaymentMethodItem[];
  defaultDate?: string;
}

export function AddTransactionDialog({
  createAction,
  categories,
  paymentMethods,
  defaultDate,
}: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nova transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
        </DialogHeader>
        <AddTransactionForm
          createAction={createAction}
          categories={categories}
          paymentMethods={paymentMethods}
          defaultDate={defaultDate}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
