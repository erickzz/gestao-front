import { Plus } from "lucide-react";
import { listBudgets } from "@/lib/http/api/budgets";
import { listCategories } from "@/lib/http/api/categories";
import { PageHeader } from "@/app/components/layout/page-header";
import { Button } from "@/app/components/ui/button";
import { CreateDialog } from "@/app/components/ui/create-dialog";
import { AddBudgetForm } from "@/app/components/budgets/add-budget-form";
import { BudgetsList } from "@/app/components/budgets/budgets-list";
import {
  createBudgetAction,
  updateBudgetAction,
  deleteBudgetAction,
} from "./actions";
import { cookies } from "next/headers";

export default async function BudgetsPage() {
  await cookies()
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [budgetsResult, categoriesResult] = await Promise.all([
    listBudgets({ month, year }),
    listCategories("EXPENSE"),
  ]);


  const { data: budgets } = budgetsResult;
  const { data: expenseCategories } = categoriesResult;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <PageHeader title="Orçamentos" month={month} year={year}>
        <CreateDialog
          title="Novo orçamento"
          trigger={
            <Button>
              <Plus className="h-4 w-4" />
              Novo orçamento
            </Button>
          }
        >
          <AddBudgetForm
            createAction={createBudgetAction}
            expenseCategories={expenseCategories}
            month={month}
            year={year}
          />
        </CreateDialog>
      </PageHeader>
      <BudgetsList
        budgets={budgets}
        expenseCategories={expenseCategories}
        updateAction={updateBudgetAction}
        deleteAction={deleteBudgetAction}
      />
    </div>
  );
}
