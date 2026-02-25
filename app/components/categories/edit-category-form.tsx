"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { CategoryResponse } from "@/types";
import { categorySchema, type CategoryFormInput } from "@/app/(protected)/categories/category-schema";
import type {
  CreateCategoryResult,
  DeleteCategoryResult,
} from "@/app/(protected)/categories/actions";
import { valuesToFormData, setServerErrors } from "@/lib/utils/form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      color: category.color,
      type: category.type,
    },
  });

  async function onSubmit(values: CategoryFormInput) {
    setUpdateError(null);
    form.clearErrors();

    const formData = valuesToFormData(values);
    formData.set("id", category.id);
    const result = await updateAction(null, formData);

    if (result.success) {
      toast.success("Categoria atualizada com sucesso");
      onSuccess?.();
    } else {
      if (result.errors) setServerErrors(form, result.errors);
      if (result.message) {
        setUpdateError(result.message);
        toast.error(result.message);
      }
    }
  }

  async function handleDelete() {
    setDeleteError(null);
    setIsDeleting(true);

    const formData = new FormData();
    formData.set("id", category.id);
    const result = await deleteAction(null, formData);

    if (result.success) {
      toast.success("Categoria excluída com sucesso");
      setDeleteDialogOpen(false);
      onSuccess?.();
    } else {
      const errorMsg = result.message ?? "Erro ao excluir";
      setDeleteError(errorMsg);
      toast.error(errorMsg);
    }
    setIsDeleting(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {updateError && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {updateError}
            </p>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Alimentação" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="color"
                    id="edit-color"
                    className="h-10 w-14 cursor-pointer rounded border border-input bg-transparent p-1"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => field.onChange(color)}
                        className="h-8 w-8 rounded-md border-2 border-transparent transition-colors hover:border-foreground/50"
                        style={{ backgroundColor: color }}
                        aria-label={`Cor ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EXPENSE">Despesa</SelectItem>
                    <SelectItem value="INCOME">Receita</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {deleteError}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel type="button">
              Cancelar
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
