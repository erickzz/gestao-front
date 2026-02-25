const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const basePath = "/api";

function getFullUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseURL}${basePath}${normalized}`;
}

async function getServerCookies(): Promise<string> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const fullUrl = getFullUrl(path);
  const { ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  if (typeof window === "undefined") {
    const cookie = await getServerCookies();
    if (cookie) {
      (headers as Record<string, string>)["cookie"] = cookie;
    }
  }

  const response = await fetch(fullUrl, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    (error as Error & { response?: Response }).response = response;
    throw error;
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response as unknown as Promise<T>;
};
