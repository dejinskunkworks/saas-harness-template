# Quality Score

Per-module grades, updated continuously. A module's grade reflects test coverage, lint cleanliness, doc freshness, and adherence to the architectural invariants in [ARCHITECTURE.md](../ARCHITECTURE.md).

## Grading rubric

| Grade | Meaning |
|---|---|
| A | Meets all invariants. Coverage ≥ 80%. Zero lint violations. Docs match code. Has Playwright smoke. |
| B | Meets core invariants. Coverage ≥ 60%. No lint errors (warnings OK). Docs mostly accurate. |
| C | Functional but has known gaps. Coverage < 60% or missing smoke tests. Debt entries exist. |
| D | Boundary violations, missing audit events, or stale docs. Blocks new work until fixed. |

## Current scores

| Module | Grade | Coverage | Notes |
|---|---|---|---|
| `auth-tenancy` | B | TBD | Core happy path tested; edge cases (role-change races, invite expiry) pending |
| `audit` | B | TBD | Append-only invariant needs a structural test |
| `notifications` | — | — | Scaffold only (per ROADMAP M2) |
| `example-module` | B | TBD | Pattern demo — do not grade against product criteria |

Fill in coverage percentages once a coverage report is wired to CI.

## Golden principles (enforced or aspirational)

| Principle | Status |
|---|---|
| Module public API only | ✅ enforced (ESLint) |
| UI ↔ services separation | ✅ enforced (ESLint) |
| Cross-cutting via `src/lib/providers` | ✅ enforced (ESLint) |
| `no-console` | ✅ enforced (ESLint error) |
| `no-any` | ✅ enforced (ESLint error) |
| Audit every write | 🟡 aspirational — needs structural test |
| Tenant always explicit in service signatures | 🟡 aspirational — needs structural test |
| RLS policy present on every domain table | 🟡 aspirational — needs migration linter |
