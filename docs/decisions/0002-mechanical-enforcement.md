# ADR 0002 — Mechanical enforcement over written rules

**Status:** accepted
**Date:** 2026-04-14

## Context

[MANIFESTO §7](../../MANIFESTO.md) requires that rules that matter be enforced mechanically, not left as prose. This ADR records how that principle is instantiated in this repo.

## Decision

Every invariant in [ARCHITECTURE.md](../../ARCHITECTURE.md) and [DOMAIN_MODEL.md](../../DOMAIN_MODEL.md) must — where technically possible — be enforced by one of:

1. **Custom ESLint rule** (for import/boundary/style invariants)
2. **Structural test** (for runtime invariants that can be asserted in Vitest)
3. **Supabase RLS policy + migration linter** (for data-layer invariants)
4. **CI gate** (for cross-cutting checks: typecheck, coverage floor, build success)

Lint error messages embed a `HARNESS FIX:` line so agents hitting the rule receive the remediation path in-context.

`no-console` is an **error**, not a warning (MANIFESTO §7: rules that matter are errors).

## Consequences

- **Positive:** the repo stays coherent even when throughput is high and human review is skimming.
- **Positive:** agents self-correct from lint output rather than needing conversational guidance.
- **Negative:** adding a new invariant is slower — you must write enforcement, not just documentation.
- **Negative:** some invariants (e.g. "every write emits an audit event") can't yet be fully enforced; they remain aspirational in `docs/quality-score.md` until a structural test exists.

## Follow-ups

- Structural test for audit-on-write (tracked in [ROADMAP.md](../../ROADMAP.md) M3)
- Migration linter for RLS policy presence
- Coverage floor in CI once baseline is established
