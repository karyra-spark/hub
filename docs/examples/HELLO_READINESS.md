# Hello Readiness Example

`examples/starknet/hello_readiness` is a minimal Starknet example for Hub contributors.

## Goal

The example demonstrates how to:

- connect to a Starknet provider;
- read public network state;
- keep the interaction read-only;
- avoid wallet connection;
- avoid signatures and transactions.

## Why It Exists

Hub is a gateway into the Starknet ecosystem. The example provides a technical baseline showing how Starknet integration can begin safely before introducing wallet or onchain actions.

## Safety Rules

The example should not:

- request seed phrases;
- request private keys;
- connect a wallet;
- sign messages;
- submit transactions;
- mint assets.

## Future Expansion

Possible future examples:

- account abstraction explainer;
- testnet block explorer walkthrough;
- Cairo learning resource map;
- Starknet Foundry setup guide;
- Dojo/game-oriented learning path.

Each example should include learner context and safety notes.
