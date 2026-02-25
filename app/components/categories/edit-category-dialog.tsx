"use client";

import type { CategoryResponse } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditCategoryForm } from "./edit-category-form";
import type {
  CreateCategoryResult,
  DeleteCategoryResult,
} from "@/app/(protected)/categories/actions";

interface EditCategoryDialogProps {
  category: CategoryResponse;
  updateAction: (
    prevState: CreateCategoryResult | null,
    formData: FormData,
  ) => Promise<CreateCategoryResult>;
  deleteAction: (
    prevState: DeleteCategoryResult | null,
    formData: FormData,
  ) => Promise<DeleteCategoryResult>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCategoryDialog({
  category,
  updateAction,
  deleteAction,
  open,
  onOpenChange,
}: EditCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
        </DialogHeader>
        <EditCategoryForm
          category={category}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
