import { describe, expect, it } from "vitest";
import {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
} from "@/lib/auth/schemas";

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toBeDefined();
      expect(emailErrors?.[0]).toBe("Email is required");
    }
  });

  it("rejects invalid email format", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toBeDefined();
      expect(emailErrors?.[0]).toBe("Invalid email address");
    }
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordErrors = result.error.flatten().fieldErrors.password;
      expect(passwordErrors).toBeDefined();
      expect(passwordErrors?.[0]).toBe("Password is required");
    }
  });

  it("accepts short passwords for existing accounts", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "short",
    });
    expect(result.success).toBe(true);
  });
});

describe("signUpSchema", () => {
  it("accepts valid signup data", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "password123",
      repeatPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects password mismatch", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "password123",
      repeatPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const repeatPasswordErrors =
        result.error.flatten().fieldErrors.repeatPassword;
      expect(repeatPasswordErrors).toBeDefined();
      expect(repeatPasswordErrors?.[0]).toBe("Passwords do not match");
    }
  });

  it("rejects short password", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "short",
      repeatPassword: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordErrors = result.error.flatten().fieldErrors.password;
      expect(passwordErrors).toBeDefined();
      expect(passwordErrors?.[0]).toBe("Password must be at least 8 characters");
    }
  });

  it("rejects empty fields", () => {
    const result = signUpSchema.safeParse({
      email: "",
      password: "",
      repeatPassword: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
      expect(errors.repeatPassword).toBeDefined();
    }
  });

  it("rejects invalid email", () => {
    const result = signUpSchema.safeParse({
      email: "not-an-email",
      password: "password123",
      repeatPassword: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toBeDefined();
      expect(emailErrors?.[0]).toBe("Invalid email address");
    }
  });
});

describe("forgotPasswordSchema", () => {
  it("accepts valid email", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "test@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toBeDefined();
      expect(emailErrors?.[0]).toBe("Email is required");
    }
  });

  it("rejects invalid email format", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "invalid-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toBeDefined();
      expect(emailErrors?.[0]).toBe("Invalid email address");
    }
  });
});

describe("updatePasswordSchema", () => {
  it("accepts valid password", () => {
    const result = updatePasswordSchema.safeParse({
      password: "newpassword123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty password", () => {
    const result = updatePasswordSchema.safeParse({
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordErrors = result.error.flatten().fieldErrors.password;
      expect(passwordErrors).toBeDefined();
      expect(passwordErrors?.[0]).toBe("Password is required");
    }
  });

  it("rejects short password", () => {
    const result = updatePasswordSchema.safeParse({
      password: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordErrors = result.error.flatten().fieldErrors.password;
      expect(passwordErrors).toBeDefined();
      expect(passwordErrors?.[0]).toBe("Password must be at least 8 characters");
    }
  });

  it("accepts exactly 8 character password", () => {
    const result = updatePasswordSchema.safeParse({
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
});
