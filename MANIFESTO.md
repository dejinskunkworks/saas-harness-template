# MANIFESTO.md

## Greenfield Build Manifesto

This repository follows a deliberate greenfield doctrine.

We do not begin by writing product code at random.
We begin by establishing the minimum set of truths, constraints, and build rules that allow humans and agents to work coherently.

A greenfield project fails less often because of weak ambition than because of premature breadth, ambiguous truth, and uncontrolled implementation drift.

This manifesto defines how we start, how we sequence, and how we decide.
It is both a constitution (what must be true) and a harness (how the machine runs).

---

## 1. We start with truth, not interfaces

Before screens, APIs, automations, or agents, we define the truth the system must protect.

Every serious software system has a core reality:
- money
- identity
- logistics
- contracts
- compliance
- records
- workflow state
- operational events

If that truth is vague, the product will become expensive theatre.

The first question is never:
"What should we build?"

The first question is:
"What must always be correct?"

---

## 2. We do not start with code. We start with repository contracts.

Every greenfield project must begin with four root documents:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `DOMAIN_MODEL.md`
- `ROADMAP.md`

These are not optional.
They are the minimum operating contracts for builders and coding agents.

If these files do not exist, the project is not ready for serious implementation.

### `AGENTS.md` — the behavior contract

`AGENTS.md` is a **table of contents, not an encyclopedia**.
It should be short (target ~100 lines) and act as a map into deeper sources of truth in `/docs/`.

It must answer, at a glance:
- What is this product?
- What is in scope now, and what is out of scope now?
- What engineering, security, and approval rules apply?
- What can agents do autonomously, and where must they escalate?
- Where does the agent go next for deeper context (links into `/docs/`)?

A giant instruction file crowds out the task, rots silently, and pattern-matches into noise.
Keep it lean. Push depth into `/docs/`.

### `ARCHITECTURE.md` — the shape contract

Defines how the system is shaped.

It must answer:
- What is the system shape?
- What are the main components and module boundaries?
- What is the source of truth for each domain?
- What lives in the app, workers, and integrations?
- What is deferred?
- What is the deployment model?
- What are the enforced dependency directions between layers?

### `DOMAIN_MODEL.md` — the truth contract

Defines what must be true.

It must answer:
- What are the canonical business objects?
- How do they relate?
- What has lifecycle state?
- What requires history and auditability?
- What are the core permission anchors?
- What is the first critical workflow?

### `ROADMAP.md` — the sequence contract

Defines what gets built first.

It must answer:
- What is v0 supposed to prove?
- What is Milestone 0, Milestone 1, and what comes next?
- What is explicitly deferred?
- What is the first complete vertical slice?
- What counts as done?

---

## 3. The repository is the system of record

If an agent cannot see it in-context while running, it effectively does not exist.

Slack threads, Google Docs, whiteboard decisions, and tacit human knowledge are invisible to the system.
Every decision that shapes behavior must be captured in-repo as markdown, schemas, tests, or executable plans.

When a decision is made, the default action is: **write it down, in the repository, now.**
The repo is the brain. Anything outside it is hearsay.

---

## 4. The first implementation order is fixed until proven otherwise

The default order of work in a greenfield repository is:

1. write `AGENTS.md`
2. write `ARCHITECTURE.md`
3. write `DOMAIN_MODEL.md`
4. write `ROADMAP.md`
5. scaffold the repository
6. add linting, formatting, tests, and CI
7. establish module boundaries and mechanical enforcement (custom linters, structural tests)
8. wire observability, local app bootability, and agent-facing tooling from day one
9. build one end-to-end vertical slice
10. expand only after the spine works

Observability and agent-facing tooling are **not** deferred to "later." They are part of the spine.
An agent that cannot observe what it builds cannot verify its own work.

We do not begin with:
- polished UI
- broad channel support
- deep integrations
- speculative microservices
- "full platform" implementation

We begin with the repo contract and one narrow workflow.

---

## 5. We build the spine before the surface area

A greenfield product should not try to build the whole city at once.
It should build the first road that proves the city can function.

The first responsibility is to establish a trustworthy spine:
- core domain model
- workflow state
- permissions
- auditability
- APIs
- observability
- one complete use case

Only then do we expand into:
- more channels
- more personas
- more modules
- more automation
- more integrations
- more convenience layers

Breadth comes after coherence.

---

## 6. We design for reality, not demos

A good greenfield system is not one that demos well.
It is one that survives contact with real work.

That means we optimize for:
- explicit state
- reversible decisions
- observable failures
- recoverable flows
- accountable actions
- inspectable outputs

We prefer a narrow system that survives reality over a broad system that collapses in production.

---

## 7. We prefer boring foundations and ambitious outcomes

We do not seek novelty in the foundation unless the product absolutely requires it.

We prefer infrastructure and patterns that are:
- stable
- legible
- well-documented
- testable
- composable
- well-represented in the agent's training data
- easy to hire for

Boring technology is easier for agents to model correctly. Novel stacks cost velocity.

We reserve ambition for the product outcome.
The architecture should be calm enough that the team can focus its creativity on the user problem.

### Selective reimplementation

Sometimes it is cheaper to reimplement a small, focused utility in-repo than to depend on an opaque third-party package.
When a dependency cannot be fully reasoned about by the agent — and the surface area is small — prefer an in-repo implementation with full test coverage and integration with local telemetry.
The bar: the agent must be able to inspect, modify, and validate it directly.

---

## 8. We isolate what changes from what should remain stable

Good architecture protects the stable core from volatile edges.

Channels will change. Prompts will change. Integrations will change. Providers will change.
Core business objects should change much more slowly.

We therefore separate:
- reference rules from execution flows
- domain logic from UI
- integrations from core behavior
- source of truth from generated artifacts
- preparation from approval
- automation from authority

Within each business domain, dependencies flow forward through a fixed set of layers.
Cross-cutting concerns (auth, telemetry, integrations, feature flags) enter through a single explicit interface.
These rules are enforced mechanically, not by convention.

---

## 9. Mechanical enforcement beats written rules

A rule that lives only in markdown rots. A rule that lives in a linter, test, or CI check compounds.

Every invariant in this manifesto and in the repo contracts must — wherever possible — be enforced by:
- custom linters (including project-specific ones the agent generates itself)
- structural tests that assert module boundaries and dependency directions
- CI gates for type safety, test coverage, doc freshness, and cross-link integrity
- schema validation at all system boundaries

Custom lint error messages should **embed remediation instructions** so that when an agent hits the lint, it receives the fix path in-context.

If a rule is important enough to write down, it is important enough to enforce.
Unenforced rules are aspirational, not architectural.

---

## 10. We treat agents as leverage within boundaries

Agents are powerful. They are not governance.

Agents should help with:
- reading, analysis, summarization
- drafting and preparation
- implementation within explicit repo rules
- reviewing other agents' work
- reproducing bugs, validating fixes, recording evidence
- opening, iterating, and (within guardrails) merging pull requests

Agents must not silently:
- approve or merge changes that cross explicit human-approval boundaries
- take irreversible actions in production systems
- invent undocumented policy
- exceed the scope of a given task

Humans remain accountable for judgment and for defining where the boundary sits.
Agents compress iteration and execution within that boundary.

Where mechanical enforcement is strong, agent autonomy can expand.
Where judgment is required, humans are escalated explicitly.

---

## 11. Agents must be able to see and drive what they build

An agent that cannot observe the running system cannot verify its own work.
The harness must make the application directly legible to agents:

- the app must be bootable locally per-task (per git worktree where possible), so each agent run gets its own isolated instance
- logs, metrics, and traces must be queryable from the agent runtime
- UI must be drivable headlessly (e.g. Chrome DevTools Protocol) so the agent can reproduce bugs, validate fixes, and record evidence
- test suites must be runnable, deterministic, and produce machine-readable output
- every feature the agent can build, the agent must also be able to exercise

If the agent can't observe it, the agent can't ship it.

---

## 12. We build the harness, not just the product

A software product is not only the code that runs.
It is also the environment in which future code will be generated, changed, reviewed, and trusted.

The harness includes:
- repo contracts (AGENTS, ARCHITECTURE, DOMAIN_MODEL, ROADMAP)
- coding standards and custom linters
- structural tests for module boundaries
- CI gates and auto-remediation
- local environment conventions and per-worktree app bootability
- observability stack accessible to agents
- agent-facing skills and tooling
- seed data and fixtures
- decision records (ADRs)
- approval boundaries
- doc-gardening processes

A strong harness compounds.
A weak harness produces entropy.

We do not only build software.
We build the conditions under which good software keeps being produced.

---

## 13. Documentation is compressed judgment

Undocumented assumptions eventually become accidental architecture.

We document the things that determine quality:
- what the product is and what it is not
- who matters first
- what the core objects are
- what the first workflow is
- what requires approval
- what is deferred
- what boundaries must not be crossed

A strong repository should teach a new engineer or coding agent how to think before it asks them to code.

But documentation alone is not enough.
Once a rule matters, **promote it from prose into enforced tooling** (§9).

---

## 14. Entropy is continuous. Garbage collection must be too.

Agents replicate patterns they see in the repo — including suboptimal ones.
Without active maintenance, drift compounds and the codebase decays.

We treat entropy control as a first-class, recurring process:
- **Golden principles** are encoded in the repo as opinionated, mechanical rules
- Background agent tasks scan on a cadence for deviations, stale docs, dead code, and untyped boundaries
- These tasks open small, targeted, auto-mergeable refactor PRs
- A quality-score document grades each domain and tracks gaps over time
- A doc-gardening agent ensures `/docs/` reflects reality

Technical debt is a high-interest loan. We pay it continuously, not in painful bursts.
Cleanup is not a ceremony — it is a background process.

---

## 15. Throughput changes the merge philosophy

When agent throughput far exceeds human attention, the economics of review invert:
**corrections are cheap. Waiting is expensive.**

In an agent-driven repository with strong mechanical enforcement:
- pull requests are short-lived
- blocking merge gates are minimized to what is truly load-bearing
- test flakes are re-run, not allowed to block indefinitely
- non-critical issues are fixed in follow-up PRs, not in pre-merge churn
- agent-to-agent review is the default; human review is escalated by exception

This would be irresponsible in a low-throughput, unenforced environment.
In a system with strong mechanical invariants, it is the correct tradeoff.

**Prerequisite:** §9 must be in place. Fast merging without enforcement is chaos.

---

## 16. We choose one vertical slice early and finish it properly

The first proof of life for a greenfield system is not the number of folders or modules created.

It is one complete end-to-end workflow that:
- begins with real input
- passes through real business logic
- produces a real output
- leaves behind persistent state
- is testable
- is auditable
- is observable

A finished narrow workflow teaches more than ten half-built broad ones.

The first vertical slice should shape the schema, service boundaries, APIs, and UI skeleton.

---

## 17. We make trust explicit

Trust is not a branding layer. It is a systems property.

We do not rely on implied context or hidden permissions.

We make explicit:
- who is acting
- on whose behalf they are acting
- for which customer, entity, or workspace
- what they are allowed to do
- what class of action is being taken
- whether approval is required
- what record is left behind

A trustworthy product is one whose behavior can be explained.

---

## 18. We preserve history

In serious systems, history matters.

We design for:
- append-only audit where appropriate
- effective dating
- explicit state transitions
- linked source records
- traceable derived artifacts
- reproducible outputs where possible
- timelines that humans can understand

We do not casually overwrite meaningful business reality.
The past is part of the product.

---

## 19. We default to observability

If something fails, we should be able to answer:
- what happened
- where it happened
- for whom it happened
- why it happened
- whether it is recoverable
- what state the system is now in
- who needs to act next

Logs, traces, events, and audit records are not optional extras.
They are part of product control — and part of the agent's feedback loop.

If we cannot explain failure, we do not yet control the system.
If the agent cannot query failure, the agent cannot fix it.

---

## 20. We defer aggressively

Greenfield teams usually fail by trying to be complete too early.

We explicitly defer:
- adjacent products
- edge personas
- advanced settings
- channel proliferation
- deep customization
- speculative infrastructure
- features that do not strengthen the core spine

Deferral is not lack of ambition. It is disciplined sequencing.

Every project needs a vision. It also needs a boundary.

---

## 21. We optimize for compounding

Every important choice should make future choices easier.

- A good domain model should support multiple workflows.
- A good API should support both UI and agent use.
- A good audit model should support support, compliance, and trust.
- A good document model should support review, generation, and export.
- A good permissions model should reduce future risk.
- A good harness makes the next feature cheaper than the last.

We are not just shipping features.
We are building reusable leverage.

---

## 22. We optimize for learning velocity, not motion

Fast is useful only when it reduces uncertainty.

The goal of early releases is not merely to ship.
The goal is to learn:
- whether the workflow matters
- whether the truth model is right
- whether users trust the system
- whether the architecture bends well
- whether the team can keep building coherently

Speed matters because it buys learning.
Motion alone is not progress.

---

## 23. Agents work from repository truth, not conversational drift

Coding agents must not be asked vague questions like:
- "build the whole platform"
- "implement the architecture"
- "make the backend"
- "create the SaaS"

Instead, agents always start by reading:
- `AGENTS.md` (and following its links into `/docs/`)
- `ARCHITECTURE.md`
- `DOMAIN_MODEL.md`
- `ROADMAP.md`

Then they:
1. summarize the intended v0 and current milestone
2. propose the smallest coherent change
3. list assumptions and risks
4. implement within module boundaries
5. add tests and update docs
6. run linters, type checks, and the observability-backed validation
7. open a PR, respond to agent and human review, and iterate until clean
8. escalate to a human only when judgment is required

Agents work from repository truth, not prompt improvisation.

---

## 24. Standard prompt sequence for any greenfield repo

### Prompt 1 — understand before coding

Read `MANIFESTO.md`, `AGENTS.md`, `ARCHITECTURE.md`, `DOMAIN_MODEL.md`, and `ROADMAP.md`.

Then:
1. summarize the product and current v0 scope
2. identify the first milestone to implement
3. propose a repository folder structure
4. list major assumptions, constraints, and architectural risks

Do not write code yet.

### Prompt 2 — scaffold only the current milestone

Using the repo contracts as source of truth, scaffold Milestone 0 or Milestone 1 only.

Requirements:
- keep changes small and reversible
- add linting, formatting, testing, CI, and the observability stack
- create module boundaries consistent with the architecture
- add custom linters for the invariants that matter
- do not implement later milestones
- do not invent undocumented product logic

Before coding:
- list affected files
- state assumptions
- show the proposed structure

### Prompt 3 — implement the first vertical slice

Implement the first end-to-end vertical slice described in `ROADMAP.md`.

Requirements:
- use `DOMAIN_MODEL.md` as canonical truth
- keep permissions explicit
- add audit events for meaningful writes
- add tests for domain logic and core flows
- ensure the agent can drive and observe the slice end-to-end
- update docs where behavior changes

Before coding:
- restate the workflow
- identify affected modules
- call out risks and unresolved assumptions

### Prompt 4 — review before expanding

Review the implementation against the repo contracts.

Then:
1. identify inconsistencies
2. identify missing tests and unenforced invariants
3. identify module-boundary violations
4. identify stale or drifting documentation
5. propose the next smallest milestone

Do not add new product surface area until the current milestone is coherent.

---

## 25. Standard root structure for any greenfield repository

Every new repository should begin with at least:

- `MANIFESTO.md`
- `AGENTS.md`
- `ARCHITECTURE.md`
- `DOMAIN_MODEL.md`
- `ROADMAP.md`
- `README.md`
- `.env.example`

And documentation directories:

- `/docs/product-specs/`
- `/docs/design/`
- `/docs/decisions/`        (ADRs)
- `/docs/exec-plans/active/`
- `/docs/exec-plans/completed/`
- `/docs/references/`       (pinned third-party context, LLM-friendly docs)
- `/docs/tech-debt.md`
- `/docs/quality-score.md`  (per-domain grades, tracked over time)

Depending on the product, add:
- `SECURITY_MODEL.md`
- `API_CONTRACTS.md`
- `AGENT_GUARDRAILS.md`
- `JURISDICTION_RULES.md`
- `FIRST_VERTICAL_SLICE.md`

---

## 26. Non-negotiable rule

If a project cannot explain its:
- `AGENTS.md`
- `ARCHITECTURE.md`
- `DOMAIN_MODEL.md`
- `ROADMAP.md`

…and cannot **mechanically enforce** its core invariants,

then it does not yet have a build system.
It only has intent.

The repository becomes executable when those documents are strong enough — and the harness around them is tight enough — that a new engineer or coding agent can enter the project and make good decisions without guessing.

---

## 27. Final principle

We do not start greenfield projects by asking what can be built.

We start by asking:
- what must be true
- what must be trusted
- what must be explicit
- what must work end to end
- what must be enforced mechanically
- what should be deferred

Then we document that, scaffold for that, enforce that, and build only that first.

That is how we create systems that compound instead of collapsing.
