# MANIFESTO.md

## Greenfield Build Manifesto

This repository follows a deliberate greenfield doctrine: we do not begin by writing product code at random. We begin by establishing the minimum set of truths, constraints, and build rules that allow humans and agents to work coherently.

A greenfield project fails less often because of weak ambition than because of premature breadth, ambiguous truth, and uncontrolled implementation drift.

This manifesto is both a **constitution** (what must be true) and a **harness** (how the machine runs).

---

## 1. Start with truth, not interfaces

Before screens, APIs, or automations, define the truth the system must protect:
identity, money, contracts, records, workflow state, audit events.

The first question is not *"What should we build?"* but *"What must always be correct?"*

## 2. Start with repository contracts, not code

Every project begins with five root documents:

- `MANIFESTO.md` — this file (doctrine)
- `AGENTS.md` — behavior contract (how agents work here)
- `ARCHITECTURE.md` — shape contract (system layout and boundaries)
- `DOMAIN_MODEL.md` — truth contract (canonical business objects)
- `ROADMAP.md` — sequence contract (what gets built first)

`AGENTS.md` is a **table of contents, not an encyclopedia** — target ~100 lines, linking into `/docs/` for depth.

## 3. The repository is the system of record

If an agent cannot see it in-context while running, it effectively does not exist. Slack threads, whiteboards, tacit knowledge — invisible. Write decisions in-repo as markdown, schemas, tests, or executable plans.

## 4. Build the spine before the surface area

Fixed default order:

1. Write the five contracts
2. Scaffold the repo
3. Add linting, formatting, tests, CI
4. Establish module boundaries + mechanical enforcement
5. Wire observability, local bootability, agent-facing tooling from day one
6. Build one end-to-end vertical slice
7. Expand only after the spine works

Observability and agent-facing tooling are not deferred — they are part of the spine.

## 5. Prefer boring foundations, ambitious outcomes

Stable, legible, well-documented, composable tech that's well-represented in agent training data. Reserve ambition for the product, not the stack.

## 6. Isolate what changes from what should remain stable

Dependencies flow forward through fixed layers per domain. Cross-cutting concerns (auth, telemetry, integrations, feature flags) enter through a single explicit interface. Enforced mechanically, not by convention.

## 7. Mechanical enforcement beats written rules

A rule in markdown rots. A rule in a linter, structural test, or CI check compounds.

- Custom linters for project-specific invariants
- Lint error messages embed `HARNESS FIX:` remediation so agents self-correct
- Rules that matter are errors, not warnings
- If it's important enough to write down, it's important enough to enforce

## 8. Agents are leverage within boundaries

Agents help with reading, drafting, implementation inside repo rules, reviewing other agents' work, and driving the app to verify fixes.

Agents must not silently approve, merge across human-approval boundaries, take irreversible production actions, or invent undocumented policy.

## 9. Agents must see and drive what they build

- App is bootable locally per task
- Logs/metrics/traces queryable from the agent runtime
- UI drivable headlessly (Playwright/CDP) so the agent can reproduce bugs and validate fixes
- Tests runnable, deterministic, machine-readable output

If the agent can't observe it, the agent can't ship it.

## 10. Build the harness, not just the product

The harness compounds. A weak harness produces entropy. Invest in repo contracts, custom linters, structural tests, CI gates, observability, agent skills, seed data, decision records, and approval boundaries.

## 11. Entropy is continuous — GC must be too

Agents replicate patterns they see, including bad ones. Encode "golden principles," run background doc-gardening and quality-score tasks, open small auto-mergeable refactor PRs. Pay technical debt continuously, not in bursts.

## 12. Throughput changes the merge philosophy

With strong mechanical enforcement, corrections are cheap and waiting is expensive. Short-lived PRs, minimal blocking gates, agent-to-agent review as default, human review by exception. Prerequisite: §7 must be in place.

## 13. One vertical slice, finished properly

One complete end-to-end workflow (input → business logic → output → persistent state → testable → auditable → observable) teaches more than ten half-built broad ones.

## 14. Trust is explicit

Who is acting, on whose behalf, for which tenant, under what authority, leaving what record. No implied context, no hidden permissions.

## 15. History is part of the product

Append-only audit where appropriate. Effective dating. Explicit state transitions. Traceable derived artifacts. We do not casually overwrite meaningful business reality.

## 16. Observability by default

If something fails, we can answer: what, where, for whom, why, recoverable?, current state?, who acts next? Logs, traces, events, audit records are product control — and the agent's feedback loop.

## 17. Defer aggressively

Deferral is disciplined sequencing, not lack of ambition. Every project needs a vision and a boundary.

## 18. Optimize for compounding and learning velocity

Every important choice should make future choices easier. Speed matters because it buys learning. Motion alone is not progress.

## 19. Agents work from repository truth, not conversational drift

Before coding, agents read the five contracts, summarize the current milestone, propose the smallest coherent change, state assumptions and risks, implement within boundaries, add tests, update docs, run linters and verification, respond to review, escalate only on judgment.

## 20. Non-negotiable

If a project cannot explain its four contracts **and mechanically enforce** its core invariants, it does not yet have a build system — only intent.

The repository becomes executable when contracts are strong enough and the harness is tight enough that any new engineer or agent can make good decisions without guessing.
