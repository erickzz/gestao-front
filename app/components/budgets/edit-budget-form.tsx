"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { BudgetResponse, CategoryResponse } from "@/types";
import { budgetSchema, type BudgetFormInput } from "@/app/(protected)/budgets/budget-schema";
import type {
  CreateBudgetResult,
  DeleteBudgetResult,
} from "@/app/(protected)/budgets/actions";
import { useFormAction } from "@/app/hooks/use-form-action";
import { useDeleteFlow } from "@/app/hooks/use-delete-flow";
import { MONTHS } from "@/lib/constants/months";
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

interface EditBudgetFormProps {
  budget: BudgetResponse;
  expenseCategories: CategoryResponse[];
  updateAction: (
    prevState: CreateBudgetResult | null,
    formData: FormData,
  ) => Promise<CreateBudgetResult>;
  deleteAction: (
    prevState: DeleteBudgetResult | null,
    formData: FormData,
  ) => Promise<DeleteBudgetResult>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditBudgetForm({
  budget,
  expenseCategories,
  updateAction,
  deleteAction,
  onSuccess,
  onCancel,
}: EditBudgetFormProps) {
  const form = useForm<BudgetFormInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: budget.categoryId,
      month: budget.month,
      year: budget.year,
      limit: budget.limit,
    },
  });

  const { submit, apiError } = useFormAction<BudgetFormInput>({
    action: updateAction,
    onSuccess: () => {
      toast.success("Orçamento atualizado com sucesso");
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
      toast.success("Orçamento excluído com sucesso");
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            submit(values, form, { id: budget.id })
          )}
          className="space-y-4"
        >
          {apiError && <ApiErrorAlert message={apiError} />}

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mês</FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(parseInt(v, 10))}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MONTHS.map((m) => (
                        <SelectItem key={m.value} value={String(m.value)}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={2000}
                      max={2100}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0,00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
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
        onConfirm={() => handleDelete(budget.id)}
        isDeleting={isDeleting}
        error={deleteError}
        title="Excluir orçamento?"
        description="Tem certeza? Esta ação não pode ser desfeita."
      />
    </>
  );
}
