import type { BudgetResponse, CategoryResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetListItem } from "./budget-list-item";
import type {
  CreateBudgetResult,
  DeleteBudgetResult,
} from "@/app/(protected)/budgets/actions";

interface BudgetsListProps {
  budgets: BudgetResponse[];
  expenseCategories: CategoryResponse[];
  updateAction: (
    prevState: CreateBudgetResult | null,
    formData: FormData,
  ) => Promise<CreateBudgetResult>;
  deleteAction: (
    prevState: DeleteBudgetResult | null,
    formData: FormData,
  ) => Promise<DeleteBudgetResult>;
}

export function BudgetsList({
  budgets,
  expenseCategories,
  updateAction,
  deleteAction,
}: BudgetsListProps) {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Orçamentos do mês
        </CardTitle>
      </CardHeader>
      <CardContent>
        {budgets.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum orçamento configurado. Adicione um para começar.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {budgets.map((budget) => (
              <BudgetListItem
                key={budget.id}
                budget={budget}
                expenseCategories={expenseCategories}
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
