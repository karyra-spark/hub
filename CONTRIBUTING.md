# Contributing to Karyra Hub

Thank you for your interest in Karyra Hub.

Hub is the Starknet ecosystem gateway for Karyra Spark. It is designed to help learners explore resources, community paths, and builder tools only after they have enough readiness context to use them safely.

## Before You Start

Please keep these principles in mind:

- Hub is readiness-aware, not a raw link directory.
- Every external resource should include context: what it is, who it is for, and when a learner is ready to open it.
- Avoid speculative, trading-first, or financial-advice language.
- Do not add wallet connection, signature, or transaction flows without explicit review.
- Do not commit secrets, local artifacts, pass files, backup files, screenshots, or private grant notes.

## Local Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

For local standalone development with the Spark app running on port `5173`:

```env
PUBLIC_SPARK_APP_URL="http://localhost:5173"
```

## Checks Before a Pull Request

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

## Content Contribution Guidelines

When adding a resource, include:

- a clear title;
- a short explanation;
- a readiness level;
- any safety notes;
- the reason the resource belongs in Hub;
- whether the resource is user-oriented, community-oriented, or builder-oriented.

Good resource framing:

```text
Use this after you understand wallet safety and account abstraction basics.
```

Risky framing:

```text
Click here to get started with live wallet actions immediately.
```

## Pull Request Checklist

- [ ] The change is scoped and easy to review.
- [ ] Public copy is clear for non-technical users.
- [ ] Readiness context is included for every external resource.
- [ ] No secrets or private/local files were committed.
- [ ] No wallet connection or onchain write flow was introduced without review.
- [ ] The Hub still builds for standalone mode and `/hub` sub-path mode.
- [ ] The audit and check commands pass.

## License

This repository currently has no explicit license file. Until one is added, all rights remain with the contributors.
