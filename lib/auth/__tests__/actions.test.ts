import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  loginAction,
  signUpAction,
  forgotPasswordAction,
  updatePasswordAction,
} from "@/lib/auth/actions";

const mockSignInWithPassword = vi.fn();
const mockSignUp = vi.fn();
const mockResetPasswordForEmail = vi.fn();
const mockUpdateUser = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() =>
    Promise.resolve({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
        resetPasswordForEmail: mockResetPasswordForEmail,
        updateUser: mockUpdateUser,
      },
    })
  ),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(`REDIRECT:${path}`);
  }),
}));

vi.mock("@/env", () => ({
  env: {
    VERCEL_URL: undefined,
  },
}));

describe("loginAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns field errors for invalid data", async () => {
    const result = await loginAction({
      email: "",
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors).toBeDefined();
    expect(result.fieldErrors?.email).toBeDefined();
    expect(result.fieldErrors?.password).toBeDefined();
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it("returns field error for invalid email", async () => {
    const result = await loginAction({
      email: "invalid-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.email).toContain("Invalid email address");
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it("redirects to /wizard on successful login", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });

    await expect(
      loginAction({
        email: "test@example.com",
        password: "password123",
      })
    ).rejects.toThrow("REDIRECT:/wizard");

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("returns error message on Supabase error", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      error: { message: "Invalid login credentials" },
    });

    const result = await loginAction({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid login credentials");
  });
});

describe("signUpAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns field errors for invalid data", async () => {
    const result = await signUpAction({
      email: "",
      password: "",
      repeatPassword: "",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors).toBeDefined();
    expect(result.fieldErrors?.email).toBeDefined();
    expect(result.fieldErrors?.password).toBeDefined();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it("returns field error for password mismatch", async () => {
    const result = await signUpAction({
      email: "test@example.com",
      password: "password123",
      repeatPassword: "different",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.repeatPassword).toContain("Passwords do not match");
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it("returns field error for short password", async () => {
    const result = await signUpAction({
      email: "test@example.com",
      password: "short",
      repeatPassword: "short",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.password).toContain(
      "Password must be at least 8 characters"
    );
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it("redirects to /auth/sign-up-success on successful signup", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null });

    await expect(
      signUpAction({
        email: "test@example.com",
        password: "password123",
        repeatPassword: "password123",
      })
    ).rejects.toThrow("REDIRECT:/auth/sign-up-success");

    expect(mockSignUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      options: {
        emailRedirectTo: "http://localhost:3000/wizard",
      },
    });
  });

  it("returns error message on Supabase error", async () => {
    mockSignUp.mockResolvedValueOnce({
      error: { message: "User already registered" },
    });

    const result = await signUpAction({
      email: "test@example.com",
      password: "password123",
      repeatPassword: "password123",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("User already registered");
  });
});

describe("forgotPasswordAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns field errors for invalid email", async () => {
    const result = await forgotPasswordAction({
      email: "",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.email).toBeDefined();
    expect(mockResetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("returns field error for invalid email format", async () => {
    const result = await forgotPasswordAction({
      email: "invalid-email",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.email).toContain("Invalid email address");
    expect(mockResetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("returns success on valid email", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });

    const result = await forgotPasswordAction({
      email: "test@example.com",
    });

    expect(result.success).toBe(true);
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("test@example.com", {
      redirectTo: "http://localhost:3000/auth/update-password",
    });
  });

  it("returns error message on Supabase error", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({
      error: { message: "Rate limit exceeded" },
    });

    const result = await forgotPasswordAction({
      email: "test@example.com",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Rate limit exceeded");
  });
});

describe("updatePasswordAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns field errors for invalid password", async () => {
    const result = await updatePasswordAction({
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.password).toBeDefined();
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("returns field error for short password", async () => {
    const result = await updatePasswordAction({
      password: "short",
    });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.password).toContain(
      "Password must be at least 8 characters"
    );
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("redirects to /wizard on successful password update", async () => {
    mockUpdateUser.mockResolvedValueOnce({ error: null });

    await expect(
      updatePasswordAction({
        password: "newpassword123",
      })
    ).rejects.toThrow("REDIRECT:/wizard");

    expect(mockUpdateUser).toHaveBeenCalledWith({
      password: "newpassword123",
    });
  });

  it("returns error message on Supabase error", async () => {
    mockUpdateUser.mockResolvedValueOnce({
      error: { message: "Session expired" },
    });

    const result = await updatePasswordAction({
      password: "newpassword123",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Session expired");
  });
});
