import { useState, useCallback } from "react";

interface DeleteActionResult {
  success: boolean;
  message?: string;
}

interface UseDeleteFlowOptions {
  deleteAction: (prevState: null, formData: FormData) => Promise<DeleteActionResult>;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function useDeleteFlow({
  deleteAction,
  onSuccess,
  onError,
}: UseDeleteFlowOptions) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    async (id: string) => {
      setDeleteError(null);
      setIsDeleting(true);

      const formData = new FormData();
      formData.set("id", id);
      const result = await deleteAction(null, formData);

      if (result.success) {
        setDeleteDialogOpen(false);
        onSuccess?.();
      } else {
        const errorMsg = result.message ?? "Erro ao excluir";
        setDeleteError(errorMsg);
        onError?.(errorMsg);
      }
      setIsDeleting(false);
    },
    [deleteAction, onSuccess, onError]
  );

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteError,
    isDeleting,
    handleDelete,
  };
}
