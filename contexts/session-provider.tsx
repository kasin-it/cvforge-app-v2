"use client";

import { useMemo } from "react";
import { SessionContext } from "@/contexts/session-context";
import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export function SessionProvider({
  sessionData,
  children,
}: {
  sessionData: Session;
  children: ReactNode;
}) {
  const value = useMemo(() => sessionData, [sessionData]);

  return <SessionContext value={value}>{children}</SessionContext>;
}
