"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditDialogProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: (close: () => void) => React.ReactNode;
}

export function EditDialog({
  title,
  open,
  onOpenChange,
  children,
}: EditDialogProps) {
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children(close)}
      </DialogContent>
    </Dialog>
  );
}
