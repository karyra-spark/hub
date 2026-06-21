# Karyra Hub

> **Guided Starknet ecosystem gateway for the Karyra Spark platform**

Karyra Hub is the ecosystem gateway for the Karyra Spark learning journey: a curated, readiness-aware explorer that helps learners move from Core, Lab, and Passport into the wider Starknet ecosystem with context and safety. It is built as a standalone SvelteKit static application with a minimal read-only [`starknet.js`](https://www.starknetjs.com) integration and can be served under the `/hub` sub-path of the main Spark platform.

**Live platform:** [spark.user.cloudjkt01.com](https://spark.user.cloudjkt01.com) → `/hub`  
**Status:** `BETA 0.1` / `v0.1.0` — public foundation; content areas and Starknet integrations are rolling out progressively.

---

## Table of Contents

- [Overview](#overview)
- [Product Philosophy](#product-philosophy)
- [Content Scope](#content-scope)
- [Repository Context](#repository-context)
- [Deployment Topology](#deployment-topology)
- [Tech Stack](#tech-stack)
- [Key Differences from `spark`](#key-differences-from-spark)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Dev Server](#running-the-dev-server)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
  - [Docker (Staging)](#docker-staging)
  - [Deployment Modes](#deployment-modes)
- [Examples](#examples)
- [Related Repositories](#related-repositories)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Karyra Spark learning path does not end at readiness. Once a learner has built basic understanding, practiced safety, and reviewed their Readiness Passport, the Hub becomes the next step: a guided place to discover Starknet resources, ecosystem tools, community paths, and builder material.

The Hub is **not a raw link catalogue**. It is a curated gateway that:

- gives users context before sending them to ecosystem resources;
- explains *when* a resource is appropriate to open, not just *what* the resource is;
- maps local learning needs and public-goods use cases onto the broader Starknet ecosystem;
- provides a gradual bridge from consumer user to technical builder.

---

## Product Philosophy

The distinction between Hub and a typical resource page is intentional:

> Hub should help users understand when a resource is safe to open, which resources need context, and when they are ready to enter the builder path.

This shapes every content and UI decision. Resources should be grouped by readiness level and purpose, not by category alone. A Starknet Foundry link should appear with enough context for a learner to understand what testing, devnet, and smart-contract tooling are. Cairo documentation should be presented after the smart-contract concept is already grounded.

---

## Content Scope

The Hub covers the following areas, delivered progressively as the platform matures:

| Area | Description |
|---|---|
| **Wallet Safety** | Curated guides for safe wallet setup, backup practices, phishing awareness, and safe-link behavior |
| **Starknet Basics** | Introductory resources on Starknet, account abstraction, STARK proofs, and ecosystem terminology |
| **Guided Resources** | Context-first links to documentation, tutorials, apps, and tooling |
| **Community Activation** | Entry points to local and global Starknet community spaces |
| **Developer Path** | Cairo, Scarb, Starknet Foundry, Dojo, and builder resources after technical readiness is established |
| **Local Use Cases** | Public-goods mapping and local-context applications of Starknet ecosystem patterns |

---

## Repository Context

The Karyra Spark platform is split into three independent repositories, each with a distinct responsibility:

| Repository | Role |
|---|---|
| [`karyra-spark/spark`](https://github.com/karyra-spark/spark) | Public learning and readiness app: Core, Lab, Passport, Community, Dashboard |
| [`karyra-spark/spark-api`](https://github.com/karyra-spark/spark-api) | Rust/Axum backend: auth, sessions, progress, media, and readiness data |
| [`karyra-spark/hub`](https://github.com/karyra-spark/hub) | Ecosystem gateway: this repo, static SvelteKit SPA with minimal Starknet integration |

Keeping Hub as a separate repository lets ecosystem content, Starknet integrations, and community tooling evolve independently from the core learning app and backend.

---

## Deployment Topology

Hub is designed to run in two modes.

### Integrated sub-path mode

Hub is built as a static SPA and served at `/hub/` under the same domain as the main Spark application.

```text
spark.example.com/        ← Spark app
spark.example.com/hub/    ← Hub static SPA
```

This is the current beta topology. The main Spark frontend links to Hub through `PUBLIC_SPARK_HUB_URL="/hub"`.

### Standalone mode

Hub can also run as its own service on a separate port or domain:

```text
localhost:5173     ← Spark dev server
localhost:5174     ← Hub dev server
```

`PUBLIC_SPARK_APP_URL` controls the back-link from Hub to Spark. `PUBLIC_HUB_BASE_PATH` controls the base path at which the static bundle is built.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit 2](https://kit.svelte.dev) + [Svelte 5](https://svelte.dev) |
| Language | [TypeScript 6](https://www.typescriptlang.org) |
| SvelteKit Adapter | [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) |
| Starknet Integration | [`starknet`](https://www.starknetjs.com) (`starknet.js`) |
| Build Tool | [Vite 8](https://vitejs.dev) |
| Package Manager | [pnpm 10](https://pnpm.io) |
| Runtime (production) | [sirv-cli](https://github.com/lukeed/sirv) |
| Containerisation | Docker (`node:22-alpine`) |

---

## Key Differences from `spark`

Hub shares the same SvelteKit + Svelte 5 + pnpm foundation as the main `spark` application, but differs in several important ways:

| Concern | `spark` | `hub` |
|---|---|---|
| SvelteKit adapter | `adapter-node` | `adapter-static` |
| Production server | Node.js (`node build`) | `sirv-cli` (`sirv build --single`) |
| Dev port | 5173 | 5174 |
| Docker port | 4173 | 4174 |
| Styling | Tailwind CSS 4 plus app styles | Plain CSS |
| UI components | Shared app UI components | Lightweight Hub-specific UI |
| Starknet.js | Not required in Spark frontend | Direct read-only dependency |
| Authentication | Full auth through `spark-api` | No direct auth; public/static gateway |
| Routing | SvelteKit app routes | Static SPA fallback |
| Build args | Mode, API base, app URL | Base path, Spark app URL |

The `--single` flag passed to `sirv` means URL paths fall back to `index.html`, enabling client-side SvelteKit routing inside the static bundle.

---

## Project Structure

```text
hub/
├── examples/
│   └── starknet/
│       └── hello_readiness/    # Minimal starknet.js example
├── src/
│   ├── routes/                 # SvelteKit routes
│   ├── lib/                    # Shared Hub components and helpers
│   └── scripts/                # Audit scripts
├── static/                     # Static assets
├── .env.example
├── .gitignore
├── .npmrc
├── Dockerfile.staging
├── package.json
├── pnpm-lock.yaml
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 22 or later
- pnpm 10 (`corepack enable` or `npm i -g pnpm`)

The Hub is a standalone static application. It does not require the Spark API or a database to build or run.

### Installation

```bash
git clone https://github.com/karyra-spark/hub.git
cd hub
pnpm install
```

### Environment Variables

Copy the example file and adjust the values for your local setup:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `PUBLIC_HUB_APP_NAME` | `Karyra Hub` | Display name for the Hub application |
| `PUBLIC_SPARK_APP_URL` | `/` or local Spark URL | Main Spark app URL used for back-navigation |

For local standalone development with Spark running separately:

```env
PUBLIC_SPARK_APP_URL="http://localhost:5173"
```

All `PUBLIC_` variables are exposed to the browser and are embedded into the static bundle at build time. Do not place secrets in them.

### Running the Dev Server

```bash
pnpm dev
```

The Hub dev server starts at:

```text
http://localhost:5174
```

To preview the production static build:

```bash
pnpm build
pnpm preview
```

---

## Available Scripts

### Development

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite dev server on port 5174 |
| `pnpm build` | Build the static SPA bundle |
| `pnpm preview` | Preview the production build locally |
| `pnpm check` | Type-check with `svelte-check` |

### Audit Scripts

Hub ships with audits for structure, path integrity, UX consistency, Docker runtime assumptions, and the minimal Starknet integration.

| Command | What it checks |
|---|---|
| `pnpm audit:hub` | Hub foundation, structure, and content contracts |
| `pnpm audit:hub-paths` | Route and asset path integrity |
| `pnpm audit:hub-docker` | Docker runtime assumptions |
| `pnpm audit:hub-ux` | UX and copy consistency |
| `pnpm audit:starknet-minimal` | Minimal Starknet.js integration checks |

Recommended pre-PR check:

```bash
pnpm audit:hub
pnpm audit:hub-paths
pnpm audit:hub-docker
pnpm audit:hub-ux
pnpm audit:starknet-minimal
pnpm check
pnpm build
```

---

## Deployment

### Docker (Staging)

`Dockerfile.staging` uses a multi-stage build. The final container serves the static output with `sirv-cli`.

```bash
docker build \
  --build-arg PUBLIC_HUB_BASE_PATH="/hub" \
  --build-arg PUBLIC_SPARK_APP_URL="https://spark.example.com" \
  --build-arg PUBLIC_SPARK_HUB_URL="/hub/" \
  -f Dockerfile.staging \
  -t karyra-hub:staging .
```

```bash
docker run -p 4174:4174 karyra-hub:staging
```

Build arguments are embedded in the static bundle at build time. If the deployment URL or base path changes, rebuild the image.

### Deployment Modes

**Mode 1 — Integrated sub-path**

Use `PUBLIC_HUB_BASE_PATH="/hub"` and serve the Hub under `/hub/` through a reverse proxy.

**Mode 2 — Standalone service**

Use `PUBLIC_HUB_BASE_PATH="/"` and deploy Hub under its own domain or port. Update Spark's `PUBLIC_SPARK_HUB_URL` to point to the standalone Hub origin.

---

## Examples

The `examples/` directory contains minimal, self-contained code demonstrating specific Hub capabilities outside the main application build.

### `examples/starknet/hello_readiness`

A minimal `starknet.js` integration that demonstrates the pattern used throughout the Hub for read-only Starknet interactions: connecting to a provider, reading chain state, and displaying information safely without requiring a wallet connection.

---

## Related Repositories

| Repository | Description |
|---|---|
| [karyra-spark/spark](https://github.com/karyra-spark/spark) | SvelteKit learning app: Core, Lab, Passport, Community, Dashboard |
| [karyra-spark/spark-api](https://github.com/karyra-spark/spark-api) | Rust/Axum backend: authentication, sessions, progress, media, and readiness data |

---

## Contributing

Contributions are welcome. Hub content, Starknet integrations, and UX are active areas. Please open an issue before submitting a pull request for significant changes.

```bash
git checkout -b feat/your-feature-name

pnpm audit:hub
pnpm audit:hub-paths
pnpm audit:hub-ux
pnpm audit:starknet-minimal
pnpm check
pnpm build
```

Keep content additions consistent with the readiness-gating philosophy: every resource should carry enough context for a learner to know whether they are ready to use it.

---

*Karyra Hub — ecosystem exploration after readiness, not before.*  
*© 2026 Karyra Spark*
