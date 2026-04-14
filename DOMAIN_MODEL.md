# DOMAIN_MODEL.md — Truth Contract

This file defines the canonical business objects the system must protect.
When in doubt, this document wins over any service, component, or type.

## Core objects

### Tenant

A customer workspace. All domain data is scoped to a tenant.

- `id: uuid` (PK)
- `name: text`
- `slug: text` (unique, URL-safe)
- `created_at`, `updated_at`, `archived_at`

**Invariants:**
- Every non-system row in every domain table carries `tenant_id`.
- RLS policies enforce `tenant_id = auth.jwt() -> 'tenant_id'` on every domain table.
- Tenants are soft-deleted via `archived_at` — never hard-deleted.

### User

An authenticated principal. Managed by Supabase Auth.

- `id: uuid` (PK, = `auth.users.id`)
- `email: text`
- Profile fields in `user_profiles` table

**Invariants:**
- A user with no memberships cannot access any tenant data.
- User identity is never inferred — always resolved from `auth.uid()` at the request boundary.

### Membership

The link between a User and a Tenant, carrying a role.

- `id: uuid` (PK)
- `tenant_id: uuid` (FK → tenants)
- `user_id: uuid` (FK → users)
- `role: enum` (see Roles below)
- `created_at`, `updated_at`, `revoked_at`

**Invariants:**
- One active membership per (tenant_id, user_id) pair. Revoked memberships preserved for audit.
- Role changes emit an audit event with `before` and `after` role.
- Revoking a membership immediately severs data access via RLS.

### Role

Enum defined in `src/lib/constants.ts`:

- `owner` — full tenant control, can add/remove owners, delete tenant
- `admin` — manage members (except owners), manage all domain data
- `member` — create and manage own domain data, read shared data
- `viewer` — read-only access to shared data

**Invariants:**
- Every tenant must have at least one `owner` at all times.
- Removing the last owner is rejected at the service layer.

### AuditEvent

Append-only record of every meaningful write.

- `id: uuid` (PK)
- `tenant_id: uuid`
- `actor_user_id: uuid | null` (null for system actions)
- `action: text` (e.g. `membership.role_changed`, `tenant.archived`)
- `resource_type: text`
- `resource_id: uuid | null`
- `before: jsonb | null`
- `after: jsonb | null`
- `metadata: jsonb` (trace_id, ip, user_agent)
- `created_at: timestamptz`

**Invariants:**
- Append-only — no UPDATE, no DELETE. Enforced at RLS.
- Every mutating service function emits exactly one audit event.
- `created_at` is server-set; never accepted from the client.

## Lifecycle state

| Object | States | Transition rules |
|---|---|---|
| Tenant | `active` → `archived` | Only `owner` can archive. Archive sets `archived_at`, revokes all memberships. |
| Membership | `active` → `revoked` | `admin`+ can revoke `member`/`viewer`. Only `owner` can revoke `admin` or `owner`. |
| User | managed by Supabase Auth | — |

State transitions emit audit events.

## Permissions anchors

All authorization decisions answer four questions:

1. **Who** — resolved from `auth.uid()` at the request boundary.
2. **Which tenant** — resolved from the URL, explicit parameter, or active membership.
3. **What role** — looked up from `memberships` where `user_id` and `tenant_id` match and `revoked_at IS NULL`.
4. **What action** — checked against the role's permitted actions.

**Anti-patterns (forbidden):**
- Inferring tenant from ambient state (e.g. "the last tenant they used").
- Passing `tenant_id` implicitly through a singleton or global.
- Skipping RLS by using a service-role key in application code paths that handle user input.

## Data that requires history

- Memberships (role changes, revocations)
- Tenant metadata changes
- Any domain entity the owning module marks as audit-worthy

History lives in `audit_events`. For high-churn fields, modules may add per-entity history tables.

## First critical workflow

Defined in [ROADMAP.md](./ROADMAP.md) as **Milestone 0**: user signs up, creates a tenant, invites a second user, the second user accepts, both see the same tenant data under RLS, audit events record every step.

Every field, every constraint, every test in the initial slice should trace back to making this workflow correct and observable.

## Anti-goals

- Storing customer data outside the tenant boundary "for convenience"
- Mutable audit
- Implicit tenant resolution
- Role bypass via service keys in user-facing paths
- Hard-deleting tenants or users
