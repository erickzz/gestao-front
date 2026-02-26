import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormFooterProps {
  onCancel: () => void;
  submitLabel?: string;
  loadingLabel?: string;
  isSubmitting: boolean;
  children?: React.ReactNode;
}

export function FormFooter({
  onCancel,
  submitLabel = "Criar",
  loadingLabel = "Criando...",
  isSubmitting,
  children,
}: FormFooterProps) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      {children}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? loadingLabel : submitLabel}
      </Button>
    </DialogFooter>
  );
}
