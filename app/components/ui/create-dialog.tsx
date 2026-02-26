"use client";

import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateDialogContext = createContext<(() => void) | null>(null);

export function useCreateDialogClose(): (() => void) | null {
  return useContext(CreateDialogContext);
}

interface CreateDialogProps {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function CreateDialog({ title, trigger, children }: CreateDialogProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <CreateDialogContext.Provider value={close}>
          {children}
        </CreateDialogContext.Provider>
      </DialogContent>
    </Dialog>
  );
}
