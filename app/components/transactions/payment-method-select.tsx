import type { PaymentMethodItem } from "@/types";
import {
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
import type { Control, FieldPath } from "react-hook-form";

interface PaymentMethodSelectProps<T extends Record<string, unknown>> {
  control: Control<T>;
  name: FieldPath<T>;
  paymentMethods: PaymentMethodItem[];
}

export function PaymentMethodSelect<T extends Record<string, unknown>>({
  control,
  name,
  paymentMethods,
}: PaymentMethodSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Forma de pagamento</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={(field.value as string) || undefined}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {paymentMethods.map((pm) => (
                <SelectItem key={pm.value} value={pm.value}>
                  {pm.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
