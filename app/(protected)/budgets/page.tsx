import { listBudgets } from "@/lib/http/api/budgets";
import { listCategories } from "@/lib/http/api/categories";
import { PageHeader } from "@/app/components/layout/page-header";
import { AddBudgetDialog } from "@/app/components/budgets/add-budget-dialog";
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
        <AddBudgetDialog
          createAction={createBudgetAction}
          expenseCategories={expenseCategories}
          month={month}
          year={year}
        />
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
