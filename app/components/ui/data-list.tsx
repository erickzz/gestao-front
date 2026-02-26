import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataListProps {
  title: string;
  empty: React.ReactNode;
  isEmpty: boolean;
  children: React.ReactNode;
  className?: string;
}

export function DataList({
  title,
  empty,
  isEmpty,
  children,
  className,
}: DataListProps) {
  return (
    <Card className={cn("border-border/60", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{isEmpty ? empty : children}</CardContent>
    </Card>
  );
}
