import type { BudgetResponse, CategoryResponse } from "@/types";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DataList } from "@/components/ui/data-list";
import { Wallet } from "lucide-react";
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
  const emptyContent = (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Wallet className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>Nenhum orçamento configurado</EmptyTitle>
        <EmptyDescription>
          Adicione um orçamento para começar a controlar seus gastos por categoria.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent />
    </Empty>
  );

  return (
    <DataList
      title="Orçamentos do mês"
      empty={emptyContent}
      isEmpty={budgets.length === 0}
    >
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
    </DataList>
  );
}
