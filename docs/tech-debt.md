# Technical Debt

Single source of truth for known debt. Pay it down continuously, not in bursts.

## Format

Each entry:

```
### [id] Short title
- **Owner:** module or person
- **Impact:** why this matters (legibility / correctness / performance / security)
- **Effort:** rough size (S / M / L)
- **Proposed fix:** link to an ADR or plan, or a one-line sketch
- **Added:** YYYY-MM-DD
```

## Active debt

### [TD-001] Migrate `src/middleware.ts` → `src/proxy.ts`

- **Owner:** infra
- **Impact:** legibility — Next.js 16 deprecation warning on every build. Will become an error in a future release.
- **Effort:** S
- **Proposed fix:** Rename file and update the `proxy()` export per https://nextjs.org/docs/messages/middleware-to-proxy. Verify trace-id stamping still works.
- **Added:** 2026-04-14

## Recently paid

_Entries move here when resolved, with the PR link, then get cleared out quarterly._
