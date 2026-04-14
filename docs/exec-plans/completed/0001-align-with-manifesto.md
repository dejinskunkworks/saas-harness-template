# Exec Plan 0001 — Align template with Greenfield Manifesto

**Status:** in progress (this PR)
**Milestone:** [ROADMAP.md](../../../ROADMAP.md) M1

## Goal

Bring the `saas-harness-template` into full alignment with the Greenfield Manifesto, so every project cloned from it starts with the full harness: contracts, structured docs, mechanical enforcement, observability, and agent-driven UI validation.

## Scope

- Add root contracts: `MANIFESTO`, `AGENTS`, `ARCHITECTURE`, `DOMAIN_MODEL`, `ROADMAP`
- Add `/docs/` skeleton with ADRs, exec-plan folders, tech-debt, quality-score
- Tighten ESLint: `no-console` → error, add cross-cutting `providers` boundary
- Add request-id middleware + AsyncLocalStorage trace propagation into existing logger
- Add Playwright smoke harness + `pnpm test:e2e` script
- Update CLAUDE.md to point to AGENTS.md (or delete)
- Verify full pipeline passes

## Out of scope

- Implementing Milestone 2 (first vertical slice)
- Structural test for audit-on-write (M3)
- Migration linter for RLS (M3)
- Doc-gardening automation (M3)

## Deferred

Tracked in [ROADMAP.md](../../../ROADMAP.md) M3.

## Decisions

- See [ADR 0001](../../decisions/0001-modular-monolith.md) and [ADR 0002](../../decisions/0002-mechanical-enforcement.md).

## Outcome

_To be filled when merged. Include: what shipped, what was deferred, what surprised us._
