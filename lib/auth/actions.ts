"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/env";
import {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
} from "@/lib/auth/schemas";
import type {
  LoginFormData,
  SignUpFormData,
  ForgotPasswordFormData,
  UpdatePasswordFormData,
} from "@/lib/auth/schemas";

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function getBaseUrl(): string {
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export async function loginAction(data: LoginFormData): Promise<ActionResult> {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/wizard");
}

export async function signUpAction(data: SignUpFormData): Promise<ActionResult> {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      emailRedirectTo: `${getBaseUrl()}/wizard`,
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/auth/sign-up-success");
}

export async function forgotPasswordAction(
  data: ForgotPasswordFormData
): Promise<ActionResult> {
  const result = forgotPasswordSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
    {
      redirectTo: `${getBaseUrl()}/auth/update-password`,
    }
  );

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return { success: true };
}

export async function updatePasswordAction(
  data: UpdatePasswordFormData
): Promise<ActionResult> {
  const result = updatePasswordSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/wizard");
}
