"use client";

import { useState } from "react";
import { EditDialog } from "@/components/ui/edit-dialog";
import { ClickableCard } from "@/components/ui/clickable-card";
import { ClickableTableRow } from "@/components/ui/clickable-table-row";

interface EditableListItemProps {
  renderContent: () => React.ReactNode;
  renderForm: (close: () => void) => React.ReactNode;
  dialogTitle: string;
  as?: "card" | "row";
  className?: string;
}

export function EditableListItem({
  renderContent,
  renderForm,
  dialogTitle,
  as = "card",
  className,
}: EditableListItemProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const Wrapper = as === "row" ? ClickableTableRow : ClickableCard;

  return (
    <>
      <Wrapper onClick={() => setOpen(true)} className={className}>
        {renderContent()}
      </Wrapper>
      <EditDialog open={open} onOpenChange={setOpen} title={dialogTitle}>
        {renderForm}
      </EditDialog>
    </>
  );
}
