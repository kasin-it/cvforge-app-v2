import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export async function getSessionOrRedirect() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}
