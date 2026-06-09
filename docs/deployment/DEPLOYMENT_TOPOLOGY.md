# Deployment Topology

Karyra Hub supports integrated and standalone deployment modes.

## Integrated Mode

Hub is served under the same domain as Spark:

```text
https://spark.example.com/
https://spark.example.com/hub/
```

Recommended build:

```bash
PUBLIC_HUB_BASE_PATH=/hub pnpm build
```

The Spark frontend should point to Hub with:

```env
PUBLIC_SPARK_HUB_URL="/hub"
```

## Standalone Mode

Hub can be deployed independently:

```text
https://hub.example.com/
```

Recommended build:

```bash
PUBLIC_HUB_BASE_PATH=/ pnpm build
```

Spark should then point to the full Hub origin:

```env
PUBLIC_SPARK_HUB_URL="https://hub.example.com"
```

## Reverse Proxy Notes

When Hub is built for `/hub`, the reverse proxy must serve page routes and static assets consistently.

Important paths:

```text
/hub/
/hub/resources
/hub/missions
/hub/_app/...
```

If page routes load but the browser is blank, check whether JavaScript assets under `/hub/_app/...` return HTTP 200.

## Build-Time Values

Hub is static. Public environment values are embedded during build. If deployment URLs change, rebuild the image or static bundle.
