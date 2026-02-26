import { cn } from "@/lib/utils";

interface ClickableCardProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ClickableCard({
  onClick,
  children,
  className,
}: ClickableCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-4 py-2.5 transition-colors hover:bg-secondary/50",
        className
      )}
    >
      {children}
    </div>
  );
}
