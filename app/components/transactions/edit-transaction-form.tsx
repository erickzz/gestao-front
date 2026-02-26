"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type {
  TransactionResponse,
  CategoryResponse,
  PaymentMethodItem,
} from "@/types";
import {
  updateTransactionSchema,
  type UpdateTransactionFormInput,
} from "@/app/(protected)/transactions/transaction-schema";
import type {
  CreateTransactionResult,
  DeleteTransactionResult,
} from "@/app/(protected)/transactions/actions";
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
import { CategorySelect } from "./category-select";
import { PaymentMethodSelect } from "./payment-method-select";

interface EditTransactionFormProps {
  transaction: TransactionResponse;
  categories: CategoryResponse[];
  paymentMethods: PaymentMethodItem[];
  updateAction: (
    prevState: CreateTransactionResult | null,
    formData: FormData,
  ) => Promise<CreateTransactionResult>;
  deleteAction: (
    prevState: DeleteTransactionResult | null,
    formData: FormData,
  ) => Promise<DeleteTransactionResult>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditTransactionForm({
  transaction,
  categories,
  paymentMethods,
  updateAction,
  deleteAction,
  onSuccess,
  onCancel,
}: EditTransactionFormProps) {
  const filteredCategories = categories.filter((c) => c.type === transaction.type);
  const dateValue = transaction.date.split("T")[0];

  const form = useForm<UpdateTransactionFormInput>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      categoryId: transaction.categoryId,
      value: transaction.value,
      date: dateValue,
      paymentMethod: transaction.paymentMethod,
      description: transaction.description,
      subcategory: transaction.subcategory ?? "",
      status: transaction.status,
    },
  });

  const { submit, apiError } = useFormAction<UpdateTransactionFormInput>({
    action: updateAction,
    onSuccess: () => {
      toast.success("Transação atualizada com sucesso");
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
      toast.success("Transação excluída com sucesso");
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            submit(values, form, { id: transaction.id })
          )}
          className="space-y-4"
        >
          {apiError && <ApiErrorAlert message={apiError} />}

          <div className="space-y-2">
            <FormLabel>Tipo</FormLabel>
            <p className="text-sm text-muted-foreground">
              {transaction.type === "INCOME" ? "Receita" : "Despesa"}
            </p>
          </div>

          <CategorySelect
            control={form.control}
            name="categoryId"
            categories={filteredCategories}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
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

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PaymentMethodSelect
            control={form.control}
            name="paymentMethod"
            paymentMethods={paymentMethods}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategoria (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
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
                    <SelectItem value="PAID">Pago</SelectItem>
                    <SelectItem value="PENDING">Pendente</SelectItem>
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
        onConfirm={() => handleDelete(transaction.id)}
        isDeleting={isDeleting}
        error={deleteError}
        title="Excluir transação?"
        description="Tem certeza? Esta ação não pode ser desfeita."
      />
    </>
  );
}
