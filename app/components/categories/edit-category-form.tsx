"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { CategoryResponse } from "@/types";
import { categorySchema, type CategoryFormInput } from "@/app/(protected)/categories/category-schema";
import type {
  CreateCategoryResult,
  DeleteCategoryResult,
} from "@/app/(protected)/categories/actions";
import { useFormAction } from "@/app/hooks/use-form-action";
import { useDeleteFlow } from "@/app/hooks/use-delete-flow";
import { ApiErrorAlert } from "@/components/ui/api-error-alert";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";
import { FormFooter } from "@/components/ui/form-footer";
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
import { CATEGORY_COLOR_PRESETS } from "@/lib/constants/colors";

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
  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      color: category.color,
      type: category.type,
    },
  });

  const { submit, apiError } = useFormAction<CategoryFormInput>({
    action: updateAction,
    onSuccess: () => {
      toast.success("Categoria atualizada com sucesso");
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteError,
    isDeleting,
    handleDelete,
  } = useDeleteFlow({
    deleteAction,
    onSuccess: () => {
      toast.success("Categoria excluída com sucesso");
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            submit(values, form, { id: category.id })
          )}
          className="space-y-4"
        >
          {apiError && <ApiErrorAlert message={apiError} />}

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
                    {CATEGORY_COLOR_PRESETS.map((color) => (
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

          <FormFooter
            onCancel={onCancel ?? (() => {})}
            submitLabel="Salvar"
            loadingLabel="Salvando..."
            isSubmitting={form.formState.isSubmitting}
          >
            <Button
              type="button"
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Excluir
            </Button>
          </FormFooter>
        </form>
      </Form>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => handleDelete(category.id)}
        isDeleting={isDeleting}
        error={deleteError}
        title="Excluir categoria?"
        description="Tem certeza? Esta ação não pode ser desfeita."
      />
    </>
  );
}
