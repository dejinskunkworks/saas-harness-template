# docs/

Structured knowledge base. The repo root files ([MANIFESTO](../MANIFESTO.md), [AGENTS](../AGENTS.md), [ARCHITECTURE](../ARCHITECTURE.md), [DOMAIN_MODEL](../DOMAIN_MODEL.md), [ROADMAP](../ROADMAP.md)) are the table of contents. Depth lives here.

## Layout

- `decisions/` — Architecture Decision Records (ADRs). One file per decision, numbered.
- `exec-plans/active/` — In-flight multi-step work. Each plan is a living document.
- `exec-plans/completed/` — Archived plans. Never deleted; they are the project's memory.
- `product-specs/` — Feature-level specs. Each file describes one user-visible capability.
- `references/` — Pinned third-party docs in LLM-friendly format (e.g. `supabase-rls-llms.txt`).
- `tech-debt.md` — Single tracker for known debt. Entries have owner, impact, and a link to a plan or ADR.
- `quality-score.md` — Per-module grades. Updated continuously.

## Rules

1. If a decision affects more than one module or is reversible with effort, write an ADR.
2. If a task has more than ~3 steps, write an exec plan before coding.
3. When a plan ships, move it to `completed/` and record what was deferred.
4. Stale docs are worse than missing docs — prefer to delete over to leave rotting.
