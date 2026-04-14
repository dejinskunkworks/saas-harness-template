# AGENTS.md — Behavior Contract

**This file is a map, not an encyclopedia.** Keep it short. Depth lives in the linked docs.

## What is this repo?

Multi-tenant SaaS starter with harness engineering. Next.js 15 modular monolith + Supabase + TypeScript strict.
Out of the box: auth, tenancy (RLS), audit, module-boundary enforcement, structured logging, Playwright smoke harness.

## Start here (every task)

1. Read [MANIFESTO.md](./MANIFESTO.md) — doctrine
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) — system shape and layer rules
3. Read [DOMAIN_MODEL.md](./DOMAIN_MODEL.md) — canonical business objects
4. Read [ROADMAP.md](./ROADMAP.md) — current milestone and what's deferred
5. Check [docs/tech-debt.md](./docs/tech-debt.md) and [docs/quality-score.md](./docs/quality-score.md)
6. For larger work, create an exec plan in [docs/exec-plans/active/](./docs/exec-plans/active/)

## What agents may do autonomously

- Read, search, summarize the repo
- Implement changes within module boundaries (enforced by ESLint)
- Add tests (Vitest unit, Playwright smoke)
- Update docs to reflect behavior changes
- Run `pnpm lint`, `pnpm tsc --noEmit`, `pnpm test`, `pnpm test:e2e`, `pnpm build`
- Open pull requests, respond to review, iterate until green

## What agents must escalate to humans

- Changes to core contracts (MANIFESTO, ARCHITECTURE, DOMAIN_MODEL, ROADMAP)
- Destructive Supabase migrations (column drops, data loss, RLS policy removal)
- Secrets, environment variables, production deploy config
- Changes to `src/modules/auth-tenancy` that relax tenant isolation
- Anything that crosses an explicit approval boundary in [docs/decisions/](./docs/decisions/)

## Engineering rules (enforced mechanically where marked)

1. **Module public API only** — import from `@/modules/x`, never `@/modules/x/internals`. [ESLint]
2. **UI must not import domain services directly** — use server actions or route handlers. [ESLint]
3. **Cross-cutting concerns go through `src/lib/providers`** — auth, telemetry, feature flags. [ESLint]
4. **No `any`** — use `unknown` and narrow. [ESLint error]
5. **No `console.*`** — use `@/lib/logger`. [ESLint error]
6. **No magic strings** — constants live in `@/lib/constants` or the owning module. [convention]
7. **Tenant context always explicit** — never inferred from ambient state.
8. **Audit every write** — every mutating action emits an audit event.
9. **TDD** — write the failing test first for any service function.
10. **Strict TypeScript** — `strict: true`, no implicit any, exact optional property types.

## Verification loop (every change)

```bash
pnpm lint            # must pass with zero warnings treated as errors
pnpm tsc --noEmit    # no type errors
pnpm test            # unit tests
pnpm test:e2e        # Playwright smoke (if UI touched)
pnpm build           # production build must succeed
```

If a lint rule blocks you, the error message contains a `HARNESS FIX:` line — follow it. Don't disable the rule. If the rule is genuinely wrong, update the rule *and* this file in the same PR.

## Where to look

| Need | Go to |
|---|---|
| Doctrine | [MANIFESTO.md](./MANIFESTO.md) |
| System shape / layer rules | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Canonical objects | [DOMAIN_MODEL.md](./DOMAIN_MODEL.md) |
| What to build next | [ROADMAP.md](./ROADMAP.md) |
| Past decisions | [docs/decisions/](./docs/decisions/) |
| Active / completed plans | [docs/exec-plans/](./docs/exec-plans/) |
| Known debt | [docs/tech-debt.md](./docs/tech-debt.md) |
| Per-domain quality grades | [docs/quality-score.md](./docs/quality-score.md) |
| Product specs | [docs/product-specs/](./docs/product-specs/) |
| Pinned third-party references | [docs/references/](./docs/references/) |

## Standard prompt sequence

1. **Understand** — read contracts, restate current milestone, list assumptions and risks. No code.
2. **Plan** — propose smallest coherent change, affected files, test approach. For non-trivial work, write to `docs/exec-plans/active/`.
3. **Implement** — change code + tests + docs atomically.
4. **Verify** — run the full verification loop.
5. **Review** — check against contracts, flag boundary violations or stale docs.

Work from repository truth, not prompt improvisation.
