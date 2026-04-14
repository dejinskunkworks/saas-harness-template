# e2e/

Playwright smoke harness. Exists so agents can drive the running app end-to-end —
reproduce bugs, validate fixes, and leave video/screenshot evidence on failure.

## Run

```bash
pnpm test:e2e:install   # one-time: install Chromium
pnpm test:e2e           # run all smoke tests
pnpm test:e2e:ui        # interactive UI mode
```

## Against a running server

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 pnpm test:e2e
```

Without `PLAYWRIGHT_BASE_URL`, the config boots `pnpm dev` automatically.

## Reports

- HTML: `playwright-report/index.html`
- JSON (machine-readable, for agents): `test-results/results.json`
- Failure videos + traces: `test-results/`

## Scope

Smoke-level only. For richer flows (e.g. the Milestone 2 vertical slice),
add one file per user journey and keep each journey under a minute.

## What *not* to test here

- Unit-level behavior (belongs in Vitest, co-located with the code)
- Implementation details (e.g. which CSS class is used) — test user-visible outcomes
