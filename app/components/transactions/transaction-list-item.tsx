"use client";

import type {
  TransactionResponse,
  CategoryResponse,
  PaymentMethodItem,
} from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TableCell } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { EditableListItem } from "@/components/ui/editable-list-item";
import { EditTransactionForm } from "./edit-transaction-form";
import type {
  CreateTransactionResult,
  DeleteTransactionResult,
} from "@/app/(protected)/transactions/actions";

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

interface TransactionListItemProps {
  transaction: TransactionResponse;
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

export function TransactionListItem({
  transaction,
  categories,
  paymentMethods,
  updateAction,
  deleteAction,
}: TransactionListItemProps) {
  const isIncome = transaction.type === "INCOME";

  return (
    <EditableListItem
      as="row"
      dialogTitle="Editar transação"
      renderContent={() => (
        <>
          <TableCell className="font-medium">
            {formatDate(transaction.date)}
          </TableCell>
          <TableCell>{transaction.description}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: transaction.category.color }}
              />
              {transaction.category.name}
            </div>
          </TableCell>
          <TableCell>
            <span className="capitalize text-muted-foreground">
              {PAYMENT_LABELS[transaction.paymentMethod] ??
                transaction.paymentMethod}
            </span>
          </TableCell>
          <TableCell>
            <span className="text-xs text-muted-foreground">
              {STATUS_LABELS[transaction.status] ?? transaction.status}
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
              {formatCurrency(transaction.value)}
            </span>
          </TableCell>
        </>
      )}
      renderForm={(close) => (
        <EditTransactionForm
          transaction={transaction}
          categories={categories}
          paymentMethods={paymentMethods}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onSuccess={close}
          onCancel={close}
        />
      )}
    />
  );
}
