import type { CategoryResponse } from "@/types";
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

interface CategorySelectProps<T extends Record<string, unknown>> {
  control: Control<T>;
  name: FieldPath<T>;
  categories: CategoryResponse[];
}

export function CategorySelect<T extends Record<string, unknown>>({
  control,
  name,
  categories,
}: CategorySelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoria</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value as string || undefined}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((cat) => (
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
  );
}
