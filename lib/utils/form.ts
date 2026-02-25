import type { Path, UseFormReturn } from "react-hook-form";

export function parseFormData(
  formData: FormData,
): Record<string, string | number> {
  const obj: Record<string, string | number> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      if (value === "") {
        obj[key] = value;
      } else {
        const num = Number(value);
        obj[key] = Number.isNaN(num) ? value : num;
      }
    }
  }
  return obj;
}

export function valuesToFormData(
  values: Record<string, unknown>,
): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue;
    formData.set(key, String(value));
  }
  return formData;
}

export function setServerErrors<T extends Record<string, unknown>>(
  form: UseFormReturn<T>,
  errors: Record<string, { _errors: string[] }> | null,
): void {
  if (!errors) return;
  for (const [field, fieldErrors] of Object.entries(errors)) {
    const message = fieldErrors._errors?.[0];
    if (message && field in form.getValues()) {
      form.setError(field as Path<T>, { message });
    }
  }
}
