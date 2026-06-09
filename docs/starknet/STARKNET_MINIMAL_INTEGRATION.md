# Starknet Minimal Integration

Hub includes a minimal read-only Starknet integration through `starknet.js`.

## Purpose

The integration exists to prove that Hub is not only a content directory. It can safely touch Starknet network data without asking users to connect a wallet or sign anything.

## Current Boundary

The current integration should remain:

- read-only;
- no wallet connection required;
- no transaction submission;
- no signature request;
- no private-key handling;
- no seed-phrase handling.

## Safe Use Cases

Safe early use cases include:

- network status checks;
- chain ID display;
- latest block lookup;
- public provider connectivity checks;
- educational explanations of what the network data means.

## Unsafe for Current Stage

Do not add these without review:

- wallet connect buttons;
- sign message flows;
- transaction flows;
- minting;
- token interactions;
- storing wallet addresses as identity;
- onchain Passport claims.

## Example

See:

```text
examples/starknet/hello_readiness
```

This example demonstrates a small pattern for connecting to public Starknet network data and displaying the result safely.
