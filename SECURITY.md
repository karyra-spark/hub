# Security Policy

Karyra Hub is a public beta static application. Its purpose is to guide ecosystem exploration after users have enough learning and safety context.

## Current Security Posture

Hub should not:

- ask for seed phrases;
- ask for private keys;
- store wallet secrets;
- require wallet connection for basic exploration;
- request signatures;
- perform transactions;
- perform onchain writes;
- frame content as financial or trading advice.

Hub may:

- show educational Starknet resources;
- perform read-only Starknet network checks;
- show wallet-safety guidance;
- link to external ecosystem resources with context;
- guide users toward community or builder paths.

## Starknet Integration Safety

The current Starknet integration is intentionally minimal and read-only. It can query public network information but should not require a wallet connection or user signature.

Future integrations that introduce wallet connection, signing, or onchain actions must be reviewed as explicit milestones.

## Environment Variables

All `PUBLIC_` variables are exposed to the browser and embedded into the static bundle. Do not store secrets in:

```text
PUBLIC_HUB_APP_NAME
PUBLIC_SPARK_APP_URL
PUBLIC_HUB_BASE_PATH
PUBLIC_SPARK_HUB_URL
```

## Reporting a Vulnerability

Please do not publish exploitable details publicly before maintainers can review them.

Include:

- affected route/component;
- expected behavior;
- observed behavior;
- reproduction steps;
- potential impact;
- screenshots or logs when safe to share.

Never include seed phrases, private keys, production tokens, full `.env` files, server credentials, or real user personal data.
