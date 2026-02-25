"use client";

import { useState } from "react";
import type { CategoryResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { EditCategoryDialog } from "./edit-category-dialog";
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
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-4 py-2.5 transition-colors hover:bg-secondary/50"
      >
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
      </div>
      <EditCategoryDialog
        category={category}
        updateAction={updateAction}
        deleteAction={deleteAction}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
