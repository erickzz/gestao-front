import type {
  TransactionResponse,
  CategoryResponse,
  PaymentMethodItem,
} from "@/types";
import type { PaginatedMeta } from "@/types";
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
import { DataList } from "@/components/ui/data-list";
import { Pagination } from "@/components/ui/pagination";
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
  const emptyContent = (
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
  );

  return (
    <DataList
      title="Transações"
      empty={emptyContent}
      isEmpty={transactions.length === 0}
    >
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
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          basePath={basePath}
          itemLabel="transações"
        />
      </>
    </DataList>
  );
}
