import { Plus } from "lucide-react";
import { listCategories } from "@/lib/http/api/categories";
import { PageHeader } from "@/app/components/layout/page-header";
import { Button } from "@/app/components/ui/button";
import { CreateDialog } from "@/app/components/ui/create-dialog";
import { AddCategoryForm } from "@/app/components/categories/add-category-form";
import { CategoriesList } from "@/app/components/categories/categories-list";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "./actions";

export default async function CategoriesPage() {
  const { data: categories } = await listCategories(undefined);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <PageHeader
        title="Categorias"
        description="Gerencie suas categorias de receitas e despesas."
      >
        <CreateDialog
          title="Nova categoria"
          trigger={
            <Button>
              <Plus className="h-4 w-4" />
              Nova categoria
            </Button>
          }
        >
          <AddCategoryForm createAction={createCategoryAction} />
        </CreateDialog>
      </PageHeader>
      <CategoriesList
        categories={categories}
        updateAction={updateCategoryAction}
        deleteAction={deleteCategoryAction}
      />
    </div>
  );
}
