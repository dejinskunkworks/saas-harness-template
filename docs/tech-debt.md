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

_None tracked yet. Add entries as debt is discovered._

## Recently paid

### [TD-001] Migrate `src/middleware.ts` → `src/proxy.ts`

- **Resolved:** 2026-04-14
- **Fix:** File renamed to `src/proxy.ts` and exported function renamed to `proxy()` per Next.js 16 convention. Trace-id stamping and Supabase session refresh verified via Playwright smoke. References in README and `src/lib/supabase/middleware.ts` docstring updated.
