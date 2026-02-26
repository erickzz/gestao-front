"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { CategoryResponse, PaymentMethodItem } from "@/types";
import {
  createTransactionSchema,
  type CreateTransactionFormInput,
} from "@/app/(protected)/transactions/transaction-schema";
import type { CreateTransactionResult } from "@/app/(protected)/transactions/actions";
import { useFormAction } from "@/app/hooks/use-form-action";
import { ApiErrorAlert } from "@/components/ui/api-error-alert";
import { useCreateDialogClose } from "@/components/ui/create-dialog";
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
import { TransactionTypeSelect } from "./transaction-type-select";
import { CategorySelect } from "./category-select";
import { PaymentMethodSelect } from "./payment-method-select";

interface AddTransactionFormProps {
  createAction: (
    prevState: CreateTransactionResult | null,
    formData: FormData,
  ) => Promise<CreateTransactionResult>;
  categories: CategoryResponse[];
  paymentMethods: PaymentMethodItem[];
  defaultDate?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddTransactionForm({
  createAction,
  categories,
  paymentMethods,
  defaultDate,
  onSuccess,
  onCancel,
}: AddTransactionFormProps) {
  const dialogClose = useCreateDialogClose();
  const handleSuccess = onSuccess ?? dialogClose ?? (() => {});
  const handleCancel = onCancel ?? dialogClose ?? (() => {});

  const today = defaultDate ?? new Date().toISOString().split("T")[0];

  const form = useForm<CreateTransactionFormInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "EXPENSE",
      categoryId: "",
      value: 0,
      date: today,
      paymentMethod: undefined,
      description: "",
      subcategory: "",
      status: "PAID",
    },
  });

  const type = form.watch("type");
  const filteredCategories = categories.filter((c) => c.type === type);

  useEffect(() => {
    const currentCategoryId = form.getValues("categoryId");
    const isValidForType = filteredCategories.some((c) => c.id === currentCategoryId);
    if (currentCategoryId && !isValidForType) {
      form.setValue("categoryId", "");
    }
  }, [type, filteredCategories, form]);

  const { submit, apiError } = useFormAction<CreateTransactionFormInput>({
    action: createAction,
    onSuccess: () => {
      toast.success("Transação criada com sucesso");
      handleSuccess();
    },
    onError: (msg) => toast.error(msg),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submit(values, form))}
        className="space-y-4"
      >
        {apiError && <ApiErrorAlert message={apiError} />}

        <TransactionTypeSelect control={form.control} name="type" />

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
                <Input
                  placeholder="Ex: Supermercado, Salário..."
                  {...field}
                />
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
                <Input placeholder="Ex: Alimentação básica" {...field} />
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
          onCancel={handleCancel}
          submitLabel="Criar"
          loadingLabel="Criando..."
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
