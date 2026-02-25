const LOCALE = "pt-BR";
const CURRENCY = "BRL";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}

export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(dateStr).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "short",
    ...options,
  });
}

export function formatDateLong(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDelta(delta: number, decimals = 1): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(decimals)}%`;
}

export function formatMonthName(month: number, year: number): string {
  const name = new Date(year, month - 1).toLocaleDateString(LOCALE, {
    month: "long",
  });
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(LOCALE, options).format(value);
}

export function getMonthRange(month: number, year: number): { dateFrom: string; dateTo: string } {
  const dateFrom = new Date(year, month - 1, 1);
  const dateTo = new Date(year, month, 0);
  return {
    dateFrom: dateFrom.toISOString().split("T")[0],
    dateTo: dateTo.toISOString().split("T")[0],
  };
}
