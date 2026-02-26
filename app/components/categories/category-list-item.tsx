"use client";

import type { CategoryResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { EditableListItem } from "@/components/ui/editable-list-item";
import { EditCategoryForm } from "./edit-category-form";
import type {
  CreateCategoryResult,
  DeleteCategoryResult,
} from "@/app/(protected)/categories/actions";

interface CategoryListItemProps {
  category: CategoryResponse;
  updateAction: (
    prevState: CreateCategoryResult | null,
    formData: FormData,
  ) => Promise<CreateCategoryResult>;
  deleteAction: (
    prevState: DeleteCategoryResult | null,
    formData: FormData,
  ) => Promise<DeleteCategoryResult>;
}

export function CategoryListItem({
  category,
  updateAction,
  deleteAction,
}: CategoryListItemProps) {
  return (
    <EditableListItem
      dialogTitle="Editar categoria"
      renderContent={() => (
        <>
          <div
            className="h-6 w-6 shrink-0 rounded-md"
            style={{ backgroundColor: category.color }}
          />
          <span className="text-sm font-medium text-foreground">
            {category.name}
          </span>
          <Badge
            variant={category.type === "INCOME" ? "default" : "secondary"}
            className="text-xs"
          >
            {category.type === "INCOME" ? "Receita" : "Despesa"}
          </Badge>
        </>
      )}
      renderForm={(close) => (
        <EditCategoryForm
          category={category}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onSuccess={close}
          onCancel={close}
        />
      )}
    />
  );
}
