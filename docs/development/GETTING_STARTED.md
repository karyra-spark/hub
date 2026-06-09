# Getting Started

This guide helps developers run Karyra Hub locally.

Hub is a standalone SvelteKit static application. It does not require the Spark API or a database to build or run.

## Prerequisites

Install:

- Node.js 22 or later
- pnpm 10
- Git

Recommended:

```bash
corepack enable
```

## Clone the Repository

```bash
git clone https://github.com/karyra-spark/hub.git
cd hub
```

## Install Dependencies

```bash
pnpm install
```

## Configure Environment

```bash
cp .env.example .env
```

Common local values:

```env
PUBLIC_HUB_APP_NAME="Karyra Hub"
PUBLIC_SPARK_APP_URL="http://localhost:5173"
```

Use `PUBLIC_SPARK_APP_URL="/"` or your deployed Spark URL when Hub is served under the same domain.

## Run Development Server

```bash
pnpm dev
```

Hub starts at:

```text
http://localhost:5174
```

## Build and Preview

Standalone build:

```bash
pnpm build
pnpm preview
```

Sub-path build for `/hub`:

```bash
PUBLIC_HUB_BASE_PATH=/hub pnpm build
pnpm preview
```

## Recommended Local Flow

```bash
pnpm install
pnpm audit:hub
pnpm audit:hub-paths
pnpm audit:hub-docker
pnpm audit:hub-ux
pnpm audit:starknet-minimal
pnpm check
pnpm build
PUBLIC_HUB_BASE_PATH=/hub pnpm build
```

## Common Issues

### Links back to Spark are wrong

Check `PUBLIC_SPARK_APP_URL`.

Use `http://localhost:5173` for local standalone development or `/` for integrated same-domain mode.

### `/hub/resources` or `/hub/missions` works directly but assets fail

Check that the reverse proxy and static server agree on the base path. When Hub is built with `PUBLIC_HUB_BASE_PATH=/hub`, assets are referenced under `/hub/_app/...`.

### Browser shows a blank page

Check the browser console and verify that all `/_app` assets return HTTP 200.
