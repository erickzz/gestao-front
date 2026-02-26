import type { CategoryResponse } from "@/types";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DataList } from "@/components/ui/data-list";
import { Folder } from "lucide-react";
import { CategoryListItem } from "./category-list-item";
import type {
  CreateCategoryResult,
  DeleteCategoryResult,
} from "@/app/(protected)/categories/actions";

interface CategoriesListProps {
  categories: CategoryResponse[];
  updateAction: (
    prevState: CreateCategoryResult | null,
    formData: FormData,
  ) => Promise<CreateCategoryResult>;
  deleteAction: (
    prevState: DeleteCategoryResult | null,
    formData: FormData,
  ) => Promise<DeleteCategoryResult>;
}

export function CategoriesList({
  categories,
  updateAction,
  deleteAction,
}: CategoriesListProps) {
  const emptyContent = (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>Nenhuma categoria encontrada</EmptyTitle>
        <EmptyDescription>
          Crie uma categoria para começar a organizar suas receitas e despesas.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent />
    </Empty>
  );

  return (
    <DataList
      title="Todas as categorias"
      empty={emptyContent}
      isEmpty={categories.length === 0}
    >
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <CategoryListItem
            key={cat.id}
            category={cat}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        ))}
      </div>
    </DataList>
  );
}
