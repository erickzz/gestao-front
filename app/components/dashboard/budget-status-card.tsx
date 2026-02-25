import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { BudgetStatusItem } from "@/types";
import { formatCurrency } from "@/lib/utils/format";
import { getCategoryIcon } from "@/lib/utils/category";

interface BudgetStatusCardProps {
  budgetStatus: BudgetStatusItem[];
}

export function BudgetStatusCard({ budgetStatus }: BudgetStatusCardProps) {
  return (
    <Card className="border-border/60 lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Orçamentos do mês
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {budgetStatus.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum orçamento configurado.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {budgetStatus.map((budget) => {
              const Icon = getCategoryIcon(budget.categoryName);
              return (
                <div
                  key={budget.budgetId}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary">
                        <Icon
                          className="h-3.5 w-3.5"
                          style={{ color: budget.categoryColor }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {budget.categoryName}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatCurrency(budget.spent)} /{" "}
                      {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(budget.percentUsed, 100)}
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
