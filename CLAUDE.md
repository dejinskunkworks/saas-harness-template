# CLAUDE.md — Agent Map for Sekretari

## What is this?

Sekretari is an AI-native governance operating system for company secretaries.
Kenya (BRS) first, UK (Companies House) second. Multi-tenant, multi-lingual, multi-user.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # run all tests
pnpm lint         # lint with harness rules
pnpm build        # production build
pnpm tsc --noEmit # type check
```

## Architecture

Modular monolith (Next.js) + AI Worker service (separate). See:
- `/ARCHITECTURE.md` — full system architecture
- `/DOMAIN_MODEL.md` — all domain entities and relationships
- `/ROADMAP.md` — milestone sequence and delivery principles
- `/AGENTS.md` — engineering principles, security rules, coding standards
- `/docs/plans/` — design docs and implementation plans

## Module structure

Modules live in `src/modules/<name>/`. Each module has:
- `index.ts` — public API (other modules import ONLY from here)
- `services/` — domain logic
- `types/` — TypeScript types
- `hooks/` — React hooks
- `components/` — UI components
- `actions/` — Next.js server actions

Modules: auth-tenancy, entities, registers, compliance, filings,
meetings-governance, documents, agents, platform-admin, audit, notifications

## Rules

1. **No cross-module internal imports.** Import from `@/modules/x`, never `@/modules/x/services/y`. ESLint enforces this.
2. **No `any`.** Use `unknown` and narrow. ESLint enforces this.
3. **No `console.log`.** Use `@/lib/logger`. ESLint enforces this.
4. **No magic strings.** Use constants from `@/lib/constants.ts`.
5. **TDD.** Write the failing test first. Every service function needs a test.
6. **Tenant context is always explicit.** Never assume tenant from ambient state.
7. **Audit everything.** Every write action must produce an audit event.

## Testing

- Unit tests: `src/modules/*/services/*.test.ts`
- Component tests: `src/modules/*/components/*.test.tsx`
- Test helpers: `src/test/helpers.ts`
- Run: `pnpm test` or `pnpm vitest run src/modules/auth-tenancy/`

## When something fails

If CI fails or a lint rule blocks you:
1. Read the error message — harness lint rules include fix instructions
2. Check the referenced doc (ARCHITECTURE.md, AGENTS.md, etc.)
3. Fix the root cause, don't disable the rule
4. If the rule is wrong, update this file and the rule together

## Current milestone

M1 — Auth & Tenancy complete. Next: M2 (Entity management, registers).
See `/ROADMAP.md` for full sequence.
