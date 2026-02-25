import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ProtectedHeader } from "@/components/layout/protected-header";

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session } = await authClient.getSession();

    if (!session) {
        redirect("/login");
    }

    const userName =
        session.user.name ?? session.user.email ?? "Usuário";

    return (
        <main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
            <ProtectedHeader userName={userName} />
            <div className="flex-1">{children}</div>
        </main>
    );
}
