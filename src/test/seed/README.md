# Seed Data

Seed scripts populate the database with realistic demo data for development and testing.

## Usage

```bash
pnpm seed        # run all seed scripts
pnpm seed:demo   # seed demo tenant only
```

## Principles

1. Seeds must be idempotent (safe to run multiple times)
2. Seeds must create realistic data (real-looking Kenyan company names, BRS numbers)
3. Seeds must cover the core v0 workflow: tenant → entity → registers → obligations → filings
4. Seeds must not depend on external APIs
