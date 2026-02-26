import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";


function getAuthBaseURL(): string {
  if (typeof window !== "undefined") {
    return "";
  }
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001")
  );
}

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
  basePath: "/api/auth",
  plugins: [
    adminClient(),
    {
      id: "next-cookies-request",
      fetchPlugins: [
        {
          id: "next-cookies-request-plugin",
          name: "next-cookies-request-plugin",
          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");
                const cookieStore = await cookies();
                ctx.headers.set("cookie", cookieStore.toString());
              }
            },
          },
        },
      ],
    },
  ],
});
