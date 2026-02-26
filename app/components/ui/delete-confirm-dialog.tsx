import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ApiErrorAlert } from "@/components/ui/api-error-alert";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
  error: string | null;
  title: string;
  description?: string;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
  error,
  title,
  description = "Tem certeza? Esta ação não pode ser desfeita.",
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {error && <ApiErrorAlert message={error} />}
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
