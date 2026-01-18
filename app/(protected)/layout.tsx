import { Suspense } from "react";
import type { ReactNode } from "react";
import { getSessionOrRedirect } from "@/lib/auth/get-session-or-redirect";
import { SessionProvider } from "@/contexts/session-provider";

type ProtectedLayoutProps = Readonly<{ children: ReactNode }>;

async function ProtectedLayoutContent({ children }: ProtectedLayoutProps) {
  const session = await getSessionOrRedirect();
  return (
    <main className="min-h-screen flex flex-col items-center">
      <SessionProvider sessionData={session}>{children}</SessionProvider>
    </main>
  );
}

function ProtectedLayoutLoading() {
  return <div>Loading...</div>;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <Suspense fallback={<ProtectedLayoutLoading />}>
      <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
    </Suspense>
  );
}
