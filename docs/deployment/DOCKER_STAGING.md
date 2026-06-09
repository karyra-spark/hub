# Docker Staging

Hub uses a multi-stage Docker build for staging and simple production-style deployments.

## Image Role

The Docker image:

1. installs dependencies with pnpm;
2. builds the static SvelteKit app;
3. serves the generated `build/` directory with `sirv-cli`;
4. uses SPA fallback for client-side routes.

## Build Integrated `/hub` Image

```bash
docker build \
  --build-arg PUBLIC_HUB_BASE_PATH="/hub" \
  --build-arg PUBLIC_SPARK_APP_URL="https://spark.example.com" \
  --build-arg PUBLIC_SPARK_HUB_URL="/hub/" \
  -f Dockerfile.staging \
  -t karyra-hub:staging .
```

## Run

```bash
docker run -p 4174:4174 karyra-hub:staging
```

Open:

```text
http://localhost:4174
```

## Staging Checks

Before building:

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

After deployment, check:

```text
/hub/
/hub/resources
/hub/missions
/hub/_app/*
```

## Static Build Warning

Public build arguments are embedded into the static bundle. Runtime environment changes will not update client-side values. Rebuild when deployment URLs or base paths change.
