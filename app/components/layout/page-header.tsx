import { formatMonthName } from "@/lib/utils/format";

interface PageHeaderProps {
  title: string;
  description?: string;
  month?: number;
  year?: number;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  month,
  year,
  children,
}: PageHeaderProps) {
  const subtitle =
    month != null && year != null
      ? `${formatMonthName(month, year)} ${year}`
      : description;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground capitalize">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
