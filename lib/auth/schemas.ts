import { z } from "zod";

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    repeatPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const updatePasswordSchema = z.object({
  password: passwordSchema,
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
