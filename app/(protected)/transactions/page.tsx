import { cookies } from "next/headers";
import { listTransactions } from "@/lib/http/api/transactions";
import { listCategories } from "@/lib/http/api/categories";
import { listPaymentMethods } from "@/lib/http/api/metadata";
import { getMonthRange } from "@/lib/utils/format";
import { PageHeader } from "@/app/components/layout/page-header";
import { AddTransactionDialog } from "@/app/components/transactions/add-transaction-dialog";
import { TransactionsList } from "@/app/components/transactions/transactions-list";
import {
  createTransactionAction,
  updateTransactionAction,
  deleteTransactionAction,
} from "./actions";

interface TransactionsPageProps {
  searchParams: Promise<{ page?: string; type?: string; month?: string; year?: string }>;
}

export default async function TransactionsPage({ searchParams }: TransactionsPageProps) {
  await cookies();
  const params = await searchParams;

  const now = new Date();
  const month = params.month ? Number(params.month) : now.getMonth() + 1;
  const year = params.year ? Number(params.year) : now.getFullYear();
  const page = params.page ? Number(params.page) : 1;
  const type = (params.type === "INCOME" || params.type === "EXPENSE") ? params.type : undefined;

  const { dateFrom, dateTo } = getMonthRange(month, year);

  const [transactionsRes, categoriesRes, paymentMethodsRes] = await Promise.all([
    listTransactions({
      page,
      limit: 20,
      dateFrom,
      dateTo,
      type,
    }),
    listCategories(),
    listPaymentMethods(),
  ]);

  const { data: transactions, meta } = transactionsRes;

  const defaultDate = `${year}-${String(month).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const baseParams = new URLSearchParams({ month: String(month), year: String(year) });
  if (type) baseParams.set("type", type);
  const basePath = `/transactions?${baseParams.toString()}`;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <PageHeader title="Transações" month={month} year={year}>
        <AddTransactionDialog
          createAction={createTransactionAction}
          categories={categoriesRes.data}
          paymentMethods={paymentMethodsRes.data}
          defaultDate={defaultDate}
        />
      </PageHeader>
      <TransactionsList
        transactions={transactions}
        meta={meta}
        basePath={basePath}
        categories={categoriesRes.data}
        paymentMethods={paymentMethodsRes.data}
        updateAction={updateTransactionAction}
        deleteAction={deleteTransactionAction}
      />
    </div>
  );
}
