import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { TransactionResponse } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";

interface RecentTransactionsCardProps {
  transactions: TransactionResponse[];
}

function TransactionItem({ tx }: { tx: TransactionResponse }) {
  const isIncome = tx.type === "INCOME";
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isIncome ? "bg-primary/10" : "bg-destructive/10"
          }`}
        >
          {isIncome ? (
            <ArrowUpRight className="h-4 w-4 text-primary" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{tx.description}</p>
          <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
        </div>
      </div>
      <p
        className={`text-sm font-semibold ${
          isIncome ? "text-primary" : "text-destructive"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(tx.value)}
      </p>
    </div>
  );
}

export function RecentTransactionsCard({
  transactions,
}: RecentTransactionsCardProps) {
  return (
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
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
