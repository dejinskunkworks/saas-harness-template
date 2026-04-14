# SaaS Harness Template

Multi-tenant SaaS starter with harness engineering. Built with Next.js 15, Supabase, and TypeScript.

## What you get

- **Auth & Tenancy** — Sign-in, sign-up, multi-tenant with RLS, role-based memberships
- **Audit System** — Immutable event log for every write action
- **Harness Engineering** — ESLint rules that teach AI agents (and humans) the architecture
- **Module Boundaries** — Enforced mechanically via linter, not by convention
- **CI Pipeline** — TypeScript check, lint, format, test, build on every push
- **TDD Ready** — Vitest configured with test helpers and example tests

## Quick start

```bash
git clone https://github.com/dejinskunkworks/saas-harness-template.git my-project
cd my-project
./setup.sh
pnpm dev
```

The setup script will:
1. Ask for your project name and description
2. Rename everything across the codebase
3. Reinitialize git with a clean history
4. Install dependencies

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Database | Supabase (Postgres + RLS) |
| Auth | Supabase Auth + SSR |
| Styling | Tailwind CSS + shadcn/ui |
| Testing | Vitest + Testing Library |
| Linting | ESLint with harness rules |
| Formatting | Prettier |
| CI | GitHub Actions |
| Package Manager | pnpm |

## Customization

After running `setup.sh`:

1. **Roles** — Edit `src/lib/constants.ts` and `supabase/migrations/00004_create_memberships.sql`
2. **Domain modules** — Add new modules in `src/modules/`, follow the `example-module` pattern
3. **Seed data** — Update `src/test/seed/demo-tenant.ts`
4. **Supabase** — Create a project, run migrations, fill in `.env.local`

## Project structure

```
src/
├── app/                    # Next.js pages and API routes
├── components/ui/          # shadcn/ui components
├── lib/                    # Shared utilities (logger, env, constants, supabase)
├── modules/                # Domain modules (each with index.ts public API)
│   ├── auth-tenancy/       # Auth, tenancy, memberships
│   ├── audit/              # Immutable audit event log
│   ├── notifications/      # Empty shell — ready for your implementation
│   └── example-module/     # Pattern demo — copy this for new modules
├── proxy.ts                # Auth session refresh + trace-id stamping (Next.js 16 proxy convention)
└── test/                   # Test setup, helpers, seed data
```

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Run all tests
pnpm lint             # Lint with harness rules
pnpm format           # Format with Prettier
pnpm tsc --noEmit     # Type check
```

## Harness engineering

This template embeds harness engineering principles:

- **CLAUDE.md** — Living map that agents read on every session
- **Linters as teachers** — ESLint error messages include fix instructions
- **CI as feedback loop** — Every push validated automatically
- **Module boundaries enforced mechanically** — Not by convention
- **Small, composable tasks** — TDD, frequent commits

## License

MIT
