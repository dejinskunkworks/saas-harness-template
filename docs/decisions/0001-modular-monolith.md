# ADR 0001 — Modular monolith over microservices

**Status:** accepted
**Date:** 2026-04-14

## Context

Greenfield SaaS starter. We need to choose an initial deployment topology.

## Decision

Single Next.js 15 app. Domain logic lives in `src/modules/<name>/` with enforced public-API boundaries.
Deploy as one unit. No microservices until the monolith demonstrably hurts.

## Consequences

- **Positive:** fast iteration, one build, one deploy, trivial local dev, RLS is the consistency boundary, agents can reason about the whole system from one repo.
- **Positive:** module boundaries enforced by ESLint give us the *option* to extract a service later without committing to it now.
- **Negative:** scaling story is "scale the monolith" until it isn't. Accepted — revisit when there is evidence of pain.
- **Negative:** background work is inline or Supabase scheduled functions. No dedicated queue. Accepted for v0.

## Alternatives considered

- **Microservices from day one** — rejected. Premature complexity; makes agent reasoning harder; no evidence of need.
- **Nx/Turborepo monorepo with multiple apps** — rejected. Single Next.js app is enough surface area for v0 through Milestone 2.
