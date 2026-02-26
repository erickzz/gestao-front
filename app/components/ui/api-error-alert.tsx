import { cn } from "@/lib/utils";

interface ApiErrorAlertProps {
  message: string;
  className?: string;
}

export function ApiErrorAlert({ message, className }: ApiErrorAlertProps) {
  return (
    <p
      className={cn(
        "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive",
        className
      )}
    >
      {message}
    </p>
  );
}
