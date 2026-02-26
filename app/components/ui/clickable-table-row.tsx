import { cn } from "@/lib/utils";
import { TableRow } from "@/components/ui/table";

interface ClickableTableRowProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ClickableTableRow({
  onClick,
  children,
  className,
}: ClickableTableRowProps) {
  return (
    <TableRow
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </TableRow>
  );
}
