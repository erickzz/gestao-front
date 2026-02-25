"use client";

import { useActionState, useEffect, useState } from "react";
import type { CategoryResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type {
  CreateCategoryResult,
  DeleteCategoryResult,
} from "@/app/(protected)/categories/actions";

const COLOR_PRESETS = [
  "#EF4444",
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
  "#84CC16",
  "#6B7280",
];

interface EditCategoryFormProps {
  category: CategoryResponse;
  updateAction: (
    prevState: CreateCategoryResult | null,
    formData: FormData,
  ) => Promise<CreateCategoryResult>;
  deleteAction: (
    prevState: DeleteCategoryResult | null,
    formData: FormData,
  ) => Promise<DeleteCategoryResult>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditCategoryForm({
  category,
  updateAction,
  deleteAction,
  onSuccess,
  onCancel,
}: EditCategoryFormProps) {
  const [updateState, updateFormAction] = useActionState(updateAction, null);
  const [deleteState, deleteFormAction] = useActionState(deleteAction, null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (updateState?.success && onSuccess) {
      onSuccess();
    }
  }, [updateState?.success, onSuccess]);

  useEffect(() => {
    if (deleteState?.success && onSuccess) {
      setDeleteDialogOpen(false);
      onSuccess();
    }
  }, [deleteState?.success, onSuccess]);

  return (
    <>
      <form action={updateFormAction} className="space-y-4">
        <input type="hidden" name="id" value={category.id} />
        {updateState && !updateState.success && updateState.message && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {updateState.message}
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="edit-name">Nome</Label>
          <Input
            id="edit-name"
            name="name"
            placeholder="Ex: Alimentação"
            defaultValue={category.name}
            required
          />
          {updateState?.errors?.name?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.name._errors[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-color">Cor</Label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="color"
              id="edit-color"
              name="color"
              defaultValue={category.color}
              className="h-10 w-14 cursor-pointer rounded border border-input bg-transparent p-1"
            />
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .closest("form")
                      ?.querySelector<HTMLInputElement>('input[name="color"]');
                    if (input) input.value = color;
                  }}
                  className="h-8 w-8 rounded-md border-2 border-transparent transition-colors hover:border-foreground/50"
                  style={{ backgroundColor: color }}
                  aria-label={`Cor ${color}`}
                />
              ))}
            </div>
          </div>
          {updateState?.errors?.color?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.color._errors[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-type">Tipo</Label>
          <select
            id="edit-type"
            name="type"
            required
            defaultValue={category.type}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Selecione...</option>
            <option value="EXPENSE">Despesa</option>
            <option value="INCOME">Receita</option>
          </select>
          {updateState?.errors?.type?._errors?.[0] && (
            <p className="text-sm text-destructive">
              {updateState.errors.type._errors[0]}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Excluir
          </Button>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteState && !deleteState.success && deleteState.message && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {deleteState.message}
            </p>
          )}
          <form action={deleteFormAction}>
            <input type="hidden" name="id" value={category.id} />
            <AlertDialogFooter>
              <AlertDialogCancel type="button">
                Cancelar
              </AlertDialogCancel>
              <Button type="submit" variant="destructive">
                Excluir
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
