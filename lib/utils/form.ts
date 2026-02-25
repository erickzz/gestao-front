export function parseFormData(
  formData: FormData,
): Record<string, string | number> {
  const obj: Record<string, string | number> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      const num = Number(value);
      obj[key] = Number.isNaN(num) ? value : num;
    }
  }
  return obj;
}
