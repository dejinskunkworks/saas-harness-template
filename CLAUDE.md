# CLAUDE.md — Agent Map for SaaS Harness Template

## What is this?

Multi-tenant SaaS starter with harness engineering. Next.js 15 modular monolith + Supabase.
Auth, tenancy, audit, and module boundary enforcement out of the box.

## Quick start

```bash
./setup.sh            # rename project, install deps
pnpm dev              # http://localhost:3000
pnpm test             # run all tests
pnpm lint             # lint with harness rules
pnpm build            # production build
pnpm tsc --noEmit     # type check
```

## Customization checklist

1. Run `./setup.sh` to rename the project
2. Edit `src/lib/constants.ts` — add your roles, regions, domain constants
3. Update `supabase/migrations/00004_create_memberships.sql` — match your roles
4. Update `src/lib/supabase/types.ts` — match your DB schema
5. Add domain modules in `src/modules/` — follow `example-module` pattern
6. Update `src/test/seed/demo-tenant.ts` — add realistic seed data
7. Set up Supabase project and fill in `.env.local`

## Module structure

Modules live in `src/modules/<name>/`. Each module has:
- `index.ts` — public API (other modules import ONLY from here)
- `services/` — domain logic
- `types/` — TypeScript types
- `hooks/` — React hooks
- `components/` — UI components
- `actions/` — Next.js server actions

Included modules: auth-tenancy, audit, notifications, example-module

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
- Run: `pnpm test` or `pnpm vitest run src/modules/example-module/`

## When something fails

If CI fails or a lint rule blocks you:
1. Read the error message — harness lint rules include fix instructions
2. Fix the root cause, don't disable the rule
3. If the rule is wrong, update this file and the rule together
