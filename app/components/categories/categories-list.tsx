import type { CategoryResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Todas as categorias
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhuma categoria encontrada. Crie uma para começar.
          </p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
