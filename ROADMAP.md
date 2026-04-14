# ROADMAP.md — Sequence Contract

## What v0 must prove

A team of two users can sign up, form a tenant, collaborate under strict RLS isolation, and have every meaningful action audited — all observable by agents via structured logs and Playwright smoke tests.

If v0 can prove that, the spine is trustworthy. Everything after v0 is surface area.

---

## Milestone 0 — Template baseline (shipped)

The current template ships this. Nothing to do here except keep it green.

- ✅ Next.js 15 App Router + TypeScript strict
- ✅ Supabase schema: tenants, memberships, audit_events
- ✅ Supabase Auth + SSR session refresh middleware
- ✅ Module structure: `auth-tenancy`, `audit`, `notifications`, `example-module`
- ✅ ESLint harness rules (module boundaries, no-any, no-console warn)
- ✅ Vitest unit tests + seed helpers
- ✅ CI: typecheck, lint, test, build

## Milestone 1 — Harness hardening (THIS PR)

Bring the template into full alignment with the Greenfield Manifesto.

- [ ] Repo contracts at root: `MANIFESTO`, `AGENTS`, `ARCHITECTURE`, `DOMAIN_MODEL`, `ROADMAP`
- [ ] `/docs/` skeleton: `decisions/`, `exec-plans/active|completed/`, `product-specs/`, `references/`, `tech-debt.md`, `quality-score.md`
- [ ] ESLint tightening: `no-console` → error, cross-cutting `providers` boundary enforced
- [ ] Request-id middleware + AsyncLocalStorage trace propagation into the logger
- [ ] Playwright smoke harness so agents can drive the app
- [ ] `npm run` scripts: `test:e2e`

**Done when:** `pnpm lint && pnpm tsc --noEmit && pnpm test && pnpm test:e2e && pnpm build` all pass on a fresh clone.

## Milestone 2 — First vertical slice

Implement the v0 workflow end-to-end in a way that shapes the schema, service boundaries, APIs, and UI skeleton for everything that follows.

**Workflow:**

1. User A signs up, verifies email, lands on empty dashboard
2. User A creates a tenant (`acme`), becomes `owner`
3. User A invites User B by email with role `member`
4. User B signs up via invite link, accepts, gets membership
5. Both users see tenant `acme` in their tenant switcher
6. User B creates a domain entity (use `example-module` as the seed — rename per project)
7. User A sees the entity (RLS allows)
8. A third party (no membership) cannot see any of it (RLS denies)
9. Every step produces an audit event with trace_id

**Acceptance:**
- Vitest tests for every service function
- Playwright smoke test that walks the full flow end-to-end
- Audit events queryable and displayed in an admin view
- Logger emits structured JSON with trace_id for every request

## Milestone 3 — Quality GC automation

- Doc-gardening script: scans for stale cross-links, missing ADRs for non-trivial changes, docs referring to deleted symbols
- `docs/quality-score.md` auto-updated by CI per module (coverage %, lint violations, debt count)
- Recurring refactor PR template for golden-principles enforcement

## Explicitly deferred

- Background job runner / queue (inline or Supabase scheduled functions until volume demands)
- Multi-region / read replicas
- Microservice decomposition
- Event bus between modules
- Multi-channel notification fan-out (email/SMS/webhook) — `notifications` module is scaffold-only
- Billing / subscriptions
- Rate limiting beyond Supabase defaults
- i18n
- Mobile clients

These are intentionally out of scope for the template. Projects that need them add them as discrete milestones after proving their own Milestone 2.

## What counts as done

For any milestone:

1. All items in the milestone's acceptance list pass in CI
2. Contracts (MANIFESTO/AGENTS/ARCHITECTURE/DOMAIN_MODEL) reflect the new behavior
3. Any new invariants are enforced by linter, structural test, or CI gate — not just documented
4. `docs/tech-debt.md` has zero untriaged entries from this milestone
5. An exec plan in `docs/exec-plans/completed/` documents what shipped and what was deferred
