import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "./stat-card";
import type { DashboardSummary, BudgetStatusItem } from "@/types";
import { formatCurrency, formatDelta } from "@/lib/utils/format";

interface DashboardStatsProps {
  summary: DashboardSummary;
  budgetStatus: BudgetStatusItem[];
}

export function DashboardStats({ summary, budgetStatus }: DashboardStatsProps) {
  const avgBudgetUsed =
    budgetStatus.length > 0
      ? Math.round(
          budgetStatus.reduce((acc, b) => acc + b.percentUsed, 0) /
            budgetStatus.length
        )
      : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Saldo"
        value={formatCurrency(summary.balance)}
        subtext={
          <>
            <ArrowUpRight className="h-3 w-3" />
            <span>
              {formatDelta(summary.incomeDelta)} receitas este mês
            </span>
          </>
        }
        icon={<Wallet className="h-4 w-4" />}
        variant="primary"
      />
      <StatCard
        label="Receitas"
        value={formatCurrency(summary.income)}
        subtext={
          <>
            <ArrowUpRight className="h-3 w-3" />
            <span>{formatDelta(summary.incomeDelta)} este mês</span>
          </>
        }
        icon={<TrendingUp className="h-4 w-4" />}
        variant="primary"
      />
      <StatCard
        label="Despesas"
        value={formatCurrency(summary.expenses)}
        subtext={
          <>
            <ArrowDownRight className="h-3 w-3" />
            <span>{formatDelta(summary.expensesDelta)} este mês</span>
          </>
        }
        icon={<TrendingDown className="h-4 w-4" />}
        variant="destructive"
      />
      <StatCard
        label="Orçamentos"
        value={`${avgBudgetUsed}%`}
        subtext={
          <span className="text-muted-foreground">utilizado em média</span>
        }
        icon={
          <Badge variant="secondary" className="text-xs">
            {budgetStatus.length} ativos
          </Badge>
        }
      />
    </div>
  );
}
