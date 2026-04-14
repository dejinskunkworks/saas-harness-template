# ARCHITECTURE.md — Shape Contract

## System shape

Next.js 15 App Router **modular monolith** on Supabase (Postgres + Auth + RLS).
One deployable unit. Domain logic lives in `src/modules/`, each module a self-contained slice with a public API.

```
┌──────────────────────── Next.js App Router ────────────────────────┐
│  src/app/          (pages, route handlers, server actions)          │
│      │                                                              │
│      ▼ (via server actions / route handlers only)                   │
│  src/modules/<domain>/   ← domain slices                            │
│      ├─ index.ts         ← PUBLIC API (only legal import target)    │
│      ├─ types/                                                      │
│      ├─ services/        ← domain logic, pure, testable             │
│      ├─ actions/         ← server actions (callable from UI)        │
│      ├─ components/                                                 │
│      └─ hooks/                                                      │
│                                                                     │
│  src/lib/providers/   ← cross-cutting entry points                  │
│      (auth, telemetry, feature flags, integrations)                 │
│  src/lib/   (logger, env, constants, supabase clients, utils)       │
│  src/components/ui/   (shadcn/ui primitives)                        │
└─────────────────────────────────────────────────────────────────────┘
           │
           ▼
     Supabase (Postgres, Auth, Storage, RLS policies)
```

## Layer rules (enforced mechanically by ESLint)

### Module boundaries

- Modules import each other **only via `@/modules/<name>`** (the `index.ts` public API).
- Direct imports into another module's internals are a **lint error**.
- If you need something from another module that isn't exported, add it to that module's `index.ts` in the same PR.

### UI ↔ domain separation

- `src/app/**` must **not** import from `src/modules/*/services/**`.
- UI calls domain logic via server actions (`actions/`) or route handlers.
- This keeps serialization boundaries explicit and makes domain services testable in isolation.

### Cross-cutting concerns

- Anything cross-cutting (auth, telemetry, feature flags, external integrations) enters through `src/lib/providers/`.
- Modules depend on providers; providers do **not** depend on modules.
- This is the single explicit edge for system-wide concerns (MANIFESTO §6).

### Forward-only layering within a module

```
types → services → actions → components / hooks
```

Services don't import components. Actions wrap services. Components call actions or use hooks.

## Source of truth

- **Tenants, memberships, roles** — `src/modules/auth-tenancy` + Supabase tables with RLS
- **Audit events** — `src/modules/audit` + append-only `audit_events` table
- **Domain entities** — owning module's `services/` + Supabase tables with RLS
- **Derived / generated** — must be reproducible from source tables

RLS policies are the ultimate enforcement layer. TypeScript types mirror DB shape via generated Supabase types.

## Separation of concerns

Referenced by ESLint error messages.

| Concern | Lives in |
|---|---|
| HTTP request shape, routing | `src/app/` |
| User input validation | server action at the boundary |
| Authn / tenant resolution | `src/lib/providers/auth` + middleware |
| Business rules | module `services/` |
| Persistence | module `services/` via Supabase clients |
| Audit emission | module `services/` calls `@/modules/audit` |
| Observability | `src/lib/logger` (structured JSON, trace-id propagated) |
| UI presentation | module `components/` + `src/components/ui` |

## Observability

- `src/lib/logger` emits structured JSON with `traceId`, `tenantId`, `userId`, `module`.
- Middleware assigns a `traceId` per request and threads it through server actions via AsyncLocalStorage.
- `console.*` is banned in application code (lint error). Use the logger.

## Testing layers

| Layer | Tool | Location |
|---|---|---|
| Unit (services, utils) | Vitest | `*.test.ts` co-located |
| Component | Vitest + Testing Library | `*.test.tsx` co-located |
| Smoke / E2E | Playwright | `e2e/` |

Agents must run `pnpm test` and, for UI changes, `pnpm test:e2e` before marking work done.

## Deployment model

- Single Next.js app on any Node host (Vercel, Fly, Render, self-hosted).
- Supabase project per environment.
- CI runs lint, typecheck, unit, build on every push.
- No microservices until the monolith demonstrably hurts. Deferred (MANIFESTO §17).

## What is deferred

- Background workers / queues (use Supabase scheduled functions when needed, or inline until real volume)
- Multi-region replication
- Microservice decomposition
- Event bus across modules (modules talk via direct imports of public APIs for now)
- Multi-channel delivery (email/SMS/webhook fan-out) — scaffold only in `notifications` module

## Non-negotiables

- Tenant isolation is enforced at the RLS layer and explicit in every service signature.
- Every mutating action emits an audit event.
- No module reaches around another module's public API.
- No UI file calls a service directly.
- No code logs via `console.*`.
