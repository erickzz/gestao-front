import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: React.ReactNode;
  icon: React.ReactNode;
  variant?: "default" | "primary" | "destructive";
}

export function StatCard({
  label,
  value,
  subtext,
  icon,
  variant = "default",
}: StatCardProps) {
  const iconColor =
    variant === "primary"
      ? "text-primary"
      : variant === "destructive"
        ? "text-destructive"
        : "";
  const subtextColor =
    variant === "primary"
      ? "text-primary"
      : variant === "destructive"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <Card className="border-border/60">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className={iconColor}>{icon}</div>
        </div>
        <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        {subtext && (
          <div className={`mt-1 flex items-center gap-1 text-xs ${subtextColor}`}>
            {subtext}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
