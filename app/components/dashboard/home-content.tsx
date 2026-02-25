"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type {
  DashboardSummary,
  BudgetStatusItem,
  TransactionResponse,
} from "@/types";
import {
  formatCurrency,
  formatDate,
  formatDelta,
  formatMonthName,
} from "@/lib/utils/format";
import { getCategoryIcon } from "@/lib/utils/category";

interface DashboardContentProps {
  summary: DashboardSummary;
  budgetStatus: BudgetStatusItem[];
  transactions: TransactionResponse[];
  month: number;
  year: number;
}

export function HomeContent({
  summary,
  budgetStatus,
  transactions,
  month,
  year,
}: DashboardContentProps) {
  const monthName = formatMonthName(month, year);

  const avgBudgetUsed =
    budgetStatus.length > 0
      ? Math.round(
        budgetStatus.reduce((acc, b) => acc + b.percentUsed, 0) /
        budgetStatus.length
      )
      : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div>
        <h1
          className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground capitalize">
          {monthName} {year}
        </p>
      </div>

      {/* Top stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Saldo</p>
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatCurrency(summary.balance)}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-primary">
              <ArrowUpRight className="h-3 w-3" />
              <span>
                {formatDelta(summary.incomeDelta)} receitas este mês
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Receitas</p>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatCurrency(summary.income)}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-primary">
              <ArrowUpRight className="h-3 w-3" />
              <span>{formatDelta(summary.incomeDelta)} este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Despesas</p>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatCurrency(summary.expenses)}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
              <ArrowDownRight className="h-3 w-3" />
              <span>{formatDelta(summary.expensesDelta)} este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Orçamentos</p>
              <Badge variant="secondary" className="text-xs">
                {budgetStatus.length} ativos
              </Badge>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {avgBudgetUsed}%
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              utilizado em média
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Recent transactions */}
        <Card className="border-border/60 lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Transações recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {transactions.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nenhuma transação encontrada.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {transactions.map((tx) => {
                  const isIncome = tx.type === "INCOME";
                  return (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${isIncome ? "bg-primary/10" : "bg-destructive/10"
                            }`}
                        >
                          {isIncome ? (
                            <ArrowUpRight className="h-4 w-4 text-primary" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {tx.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(tx.date)}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-sm font-semibold ${isIncome ? "text-primary" : "text-destructive"
                          }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(tx.value)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budgets */}
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
      </div>
    </div>
  );
}
