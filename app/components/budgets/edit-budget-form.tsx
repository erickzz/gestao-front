"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { BudgetResponse, CategoryResponse } from "@/types";
import { budgetSchema, type BudgetFormInput } from "@/app/(protected)/budgets/budget-schema";
import type {
  CreateBudgetResult,
  DeleteBudgetResult,
} from "@/app/(protected)/budgets/actions";
import { valuesToFormData, setServerErrors } from "@/lib/utils/form";
import { MONTHS } from "@/lib/constants/months";
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
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<BudgetFormInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: budget.categoryId,
      month: budget.month,
      year: budget.year,
      limit: budget.limit,
    },
  });

  async function onSubmit(values: BudgetFormInput) {
    setUpdateError(null);
    form.clearErrors();

    const formData = valuesToFormData(values);
    formData.set("id", budget.id);
    const result = await updateAction(null, formData);

    if (result.success) {
      toast.success("Orçamento atualizado com sucesso");
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
    formData.set("id", budget.id);
    const result = await deleteAction(null, formData);

    if (result.success) {
      toast.success("Orçamento excluído com sucesso");
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
            <AlertDialogTitle>Excluir orçamento?</AlertDialogTitle>
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
