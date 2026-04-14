# src/lib/providers/

Cross-cutting concerns enter the application through this directory.
See [ARCHITECTURE.md §Cross-cutting concerns](../../../ARCHITECTURE.md).

Put here:
- auth context resolution (who is the user, which tenant, what role)
- telemetry / trace context propagation
- feature flag clients
- external integration clients (e.g. email, payment)

Do not put here:
- business rules (belong in `src/modules/*/services/`)
- UI components (belong in `src/modules/*/components/` or `src/components/ui/`)
- pure utilities (belong in `src/lib/`)

Rule of thumb: a provider is something modules *depend on* but that does not itself depend on any module.
