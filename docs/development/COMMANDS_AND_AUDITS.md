# Commands and Audits

Hub includes development commands and audit scripts to keep the static app safe, consistent, and deployment-ready.

## Development Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server on port 5174 |
| `pnpm check` | Type-check with `svelte-check` |
| `pnpm build` | Build the static SPA |
| `pnpm preview` | Preview the production build locally |

## Audit Commands

| Command | Purpose |
|---|---|
| `pnpm audit:hub` | Checks Hub foundation, route/content structure, and required files |
| `pnpm audit:hub-paths` | Checks base path and internal route assumptions |
| `pnpm audit:hub-docker` | Checks Docker/static runtime expectations |
| `pnpm audit:hub-ux` | Checks public copy and UX expectations |
| `pnpm audit:starknet-minimal` | Checks the minimal Starknet integration surface |

## Pre-PR Check

```bash
pnpm audit:hub
pnpm audit:hub-paths
pnpm audit:hub-docker
pnpm audit:hub-ux
pnpm audit:starknet-minimal
pnpm check
pnpm build
PUBLIC_HUB_BASE_PATH=/hub pnpm build
```

## Why Audits Matter

Hub is public-facing and intentionally beginner-friendly. Audits help prevent:

- broken `/hub` base-path behavior;
- raw internal language in public copy;
- broken Starknet minimal integration;
- accidental removal of required pages;
- Docker/static runtime drift.
