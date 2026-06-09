import { base } from '$app/paths';

const DEFAULT_SPARK_URL = '/';

function normalizeSparkUrl(value: string | undefined) {
  if (!value) return DEFAULT_SPARK_URL;
  const trimmed = value.trim();
  return trimmed || DEFAULT_SPARK_URL;
}

export const sparkAppUrl = normalizeSparkUrl(import.meta.env.PUBLIC_SPARK_APP_URL);

export function hubPath(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return base || '/';
  return `${base}${normalized}`;
}

export function hubHref(path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;

  const [rawPath, hash] = path.split('#');
  const route = rawPath || '/';
  return `${hubPath(route)}${hash ? `#${hash}` : ''}`;
}
