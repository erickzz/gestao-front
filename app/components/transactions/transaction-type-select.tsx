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

interface TransactionTypeSelectProps<T extends { type?: string }> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function TransactionTypeSelect<T extends { type?: string }>({
  control,
  name,
}: TransactionTypeSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
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
  );
}
