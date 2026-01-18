# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint

## Architecture

This is a Next.js 16 application with Supabase authentication, using the App Router and React 19.

### Supabase Client Pattern

Two Supabase clients exist for different contexts:
- `lib/supabase/server.ts` - Server-side client using cookies (for Server Components, Route Handlers)
- `lib/supabase/client.ts` - Browser client (for Client Components)

**Important**: Always create a fresh server client per request - never store in a global variable (critical for Fluid compute).

### Authentication Flow

- Auth pages live under `app/auth/` (login, sign-up, forgot-password, update-password, confirm)
- `app/auth/confirm/route.ts` - Handles email verification OTP callbacks
- Protected routes use the `(protected)` route group with a layout that enforces authentication
- `lib/auth/get-session.ts` - Gets current session (returns null if not authenticated)
- `lib/auth/get-session-or-redirect.ts` - Gets session or redirects to login
- Session is provided to protected pages via `SessionContext` (React Context)

### Environment Variables

Uses `@t3-oss/env-nextjs` with Zod validation in `env.ts`. Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

**ESLint enforces**: Use `env.VARIABLE` from `@/env` instead of `process.env.VARIABLE`.

### UI Components

- `components/ui/` - Radix-based shadcn/ui primitives (excluded from lint)
- `components/` - Application-specific components
- `app/_components/` - Page-specific components (landing page sections)

### Key ESLint Rules

- No `React` default import (unnecessary since React 17)
- No relative imports (`../*`, `./*`) - use `@/` path alias
- No `process.env` - use validated env from `@/env`
- Types must use `type` keyword, not `interface`
- No floating promises - must be awaited or handled
- Unused vars must be prefixed with `_`

### Next.js Configuration

- `typedRoutes: true` - Enables typed route parameters
- `cacheComponents: true` - Enables component caching
