import type {
  TransactionResponse,
  CategoryResponse,
  PaymentMethodItem,
} from "@/types";
import type { PaginatedMeta } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
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
import { Receipt } from "lucide-react";
import { TransactionListItem } from "./transaction-list-item";
import type {
  CreateTransactionResult,
  DeleteTransactionResult,
} from "@/app/(protected)/transactions/actions";

interface TransactionsListProps {
  transactions: TransactionResponse[];
  meta: PaginatedMeta;
  basePath: string;
  categories: CategoryResponse[];
  paymentMethods: PaymentMethodItem[];
  updateAction: (
    prevState: CreateTransactionResult | null,
    formData: FormData,
  ) => Promise<CreateTransactionResult>;
  deleteAction: (
    prevState: DeleteTransactionResult | null,
    formData: FormData,
  ) => Promise<DeleteTransactionResult>;
}

export function TransactionsList({
  transactions,
  meta,
  basePath,
  categories,
  paymentMethods,
  updateAction,
  deleteAction,
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
                  <TransactionListItem
                    key={tx.id}
                    transaction={tx}
                    categories={categories}
                    paymentMethods={paymentMethods}
                    updateAction={updateAction}
                    deleteAction={deleteAction}
                  />
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
