import { getAggregated } from "@/lib/http/api/dashboard";
import { listTransactions } from "@/lib/http/api/transactions";
import { getMonthRange } from "@/lib/utils/format";
import { HomeContent } from "@/app/components/dashboard/home-content";

export default async function DashboardPage() {
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
    <HomeContent
      summary={summary}
      budgetStatus={budgetStatus}
      transactions={transactions}
      month={month}
      year={year}
    />
  );
}
