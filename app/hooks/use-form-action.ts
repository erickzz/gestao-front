import { useState, useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";
import { valuesToFormData, setServerErrors } from "@/lib/utils/form";

type ActionResult = {
  success: boolean;
  message: string;
  errors: Record<string, { _errors: string[] }> | null;
};

type FormAction = (
  prevState: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

interface UseFormActionOptions {
  action: FormAction;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function useFormAction<T extends Record<string, unknown>>({
  action,
  onSuccess,
  onError,
}: UseFormActionOptions) {
  const [apiError, setApiError] = useState<string | null>(null);

  const clearApiError = useCallback(() => setApiError(null), []);

  const submit = useCallback(
    async (
      values: T,
      form: UseFormReturn<T>,
      extra?: Record<string, string>
    ): Promise<ActionResult> => {
      setApiError(null);
      form.clearErrors();

      const formData = valuesToFormData(values as Record<string, unknown>);
      if (extra) {
        for (const [key, value] of Object.entries(extra)) {
          formData.set(key, value);
        }
      }

      const result = await action(null, formData);

      if (result.success) {
        onSuccess?.();
      } else {
        if (result.errors) setServerErrors(form, result.errors);
        if (result.message) {
          setApiError(result.message);
          onError?.(result.message);
        }
      }

      return result;
    },
    [action, onSuccess, onError]
  );

  return { submit, apiError, setApiError, clearApiError };
}
