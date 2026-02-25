import type { TransactionResponse } from "@/types";
import type { PaginatedMeta } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRight, ArrowDownRight, Receipt } from "lucide-react";

interface TransactionsListProps {
  transactions: TransactionResponse[];
  meta: PaginatedMeta;
  basePath: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  PIX: "PIX",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  CASH: "Dinheiro",
  BANK_TRANSFER: "Transferência Bancária",
  BOLETO: "Boleto",
  OTHER: "Outro",
};

const STATUS_LABELS: Record<string, string> = {
  PAID: "Pago",
  PENDING: "Pendente",
};

function TransactionRow({ tx }: { tx: TransactionResponse }) {
  const isIncome = tx.type === "INCOME";
  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatDate(tx.date)}
      </TableCell>
      <TableCell>{tx.description}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: tx.category.color }}
          />
          {tx.category.name}
        </div>
      </TableCell>
      <TableCell>
        <span className="capitalize text-muted-foreground">
          {PAYMENT_LABELS[tx.paymentMethod] ?? tx.paymentMethod}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-xs text-muted-foreground">
          {STATUS_LABELS[tx.status] ?? tx.status}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <span
          className={`inline-flex items-center gap-1 font-semibold ${
            isIncome ? "text-primary" : "text-destructive"
          }`}
        >
          {isIncome ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {isIncome ? "+" : "-"}
          {formatCurrency(tx.value)}
        </span>
      </TableCell>
    </TableRow>
  );
}

export function TransactionsList({
  transactions,
  meta,
  basePath,
}: TransactionsListProps) {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Transações
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Receipt className="h-6 w-6" />
              </EmptyMedia>
              <EmptyTitle>Nenhuma transação</EmptyTitle>
              <EmptyDescription>
                Adicione sua primeira transação para começar a controlar suas
                finanças.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent />
          </Empty>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))}
              </TableBody>
            </Table>
            {meta.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Página {meta.page} de {meta.totalPages} ({meta.total}{" "}
                  transações)
                </p>
                <div className="flex gap-2">
                  {meta.page > 1 && (
                    <a
                      href={`${basePath}&page=${meta.page - 1}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Anterior
                    </a>
                  )}
                  {meta.page < meta.totalPages && (
                    <a
                      href={`${basePath}&page=${meta.page + 1}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Próxima
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
