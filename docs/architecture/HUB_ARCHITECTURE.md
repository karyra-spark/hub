# Hub Architecture

Karyra Hub is a static SvelteKit application that serves as the Starknet ecosystem gateway for Karyra Spark.

## Role in the Platform

```text
spark      → public learning and readiness app
spark-api  → backend API and persistence layer
hub        → static ecosystem gateway and Starknet resource explorer
```

Hub is separate from Spark so ecosystem content, Starknet resources, and community/builder paths can evolve independently.

## Application Model

Hub is built with:

- SvelteKit 2;
- Svelte 5;
- TypeScript;
- `@sveltejs/adapter-static`;
- plain CSS;
- `starknet.js` for minimal read-only Starknet checks.

The application is built as a static SPA and served by `sirv-cli` with SPA fallback.

## Public Routes

Common Hub routes include:

| Route | Role |
|---|---|
| `/hub/` | Hub landing page |
| `/hub/resources` | Curated resources |
| `/hub/missions` | Guided ecosystem missions |

In standalone mode, the same routes may be served from `/`, `/resources`, and `/missions` depending on `PUBLIC_HUB_BASE_PATH`.

## Base Path

`PUBLIC_HUB_BASE_PATH` determines where the app is mounted.

Examples:

```bash
PUBLIC_HUB_BASE_PATH=/hub pnpm build
PUBLIC_HUB_BASE_PATH=/ pnpm build
```

When deployed under `/hub`, all internal links and asset paths must respect that base path.

## Data and Persistence

Hub is currently static and does not own user accounts, sessions, private data, or database writes. Readiness context is represented through product flow and navigation patterns. Deeper integration with Spark or Spark API should be introduced as reviewed milestones.

## Starknet Boundary

The current Starknet integration is read-only and minimal. It may query public network state but should not require wallet connection, signatures, transactions, or private keys.
