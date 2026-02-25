import { cookies } from "next/headers";
import { getAggregated } from "@/lib/http/api/dashboard";
import { listTransactions } from "@/lib/http/api/transactions";
import { getMonthRange } from "@/lib/utils/format";
import { PageHeader } from "@/app/components/layout/page-header";
import { DashboardStats } from "@/app/components/dashboard/dashboard-stats";
import { RecentTransactionsCard } from "@/app/components/dashboard/recent-transactions-card";
import { BudgetStatusCard } from "@/app/components/dashboard/budget-status-card";

export default async function HomePage() {
  await cookies();
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const { dateFrom, dateTo } = getMonthRange(month, year);

  const [aggregated, transactionsResult] = await Promise.all([
    getAggregated({ month, year, months: 3 }),
    listTransactions({
      dateFrom,
      dateTo,
      limit: 10,
      page: 1,
    }),
  ]);

  const { summary, budgetStatus } = aggregated.data;
  const { data: transactionsRaw } = transactionsResult;

  const transactions = [...transactionsRaw].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <PageHeader title="Dashboard" month={month} year={year} />
      <DashboardStats summary={summary} budgetStatus={budgetStatus} />
      <div className="grid gap-4 lg:grid-cols-5">
        <RecentTransactionsCard transactions={transactions} />
        <BudgetStatusCard budgetStatus={budgetStatus} />
      </div>
    </div>
  );
}
