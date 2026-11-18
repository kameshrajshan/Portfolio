// Prefix an absolute site path with the configured `base` (needed on GitHub Pages project sites).
export const u = (p: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (p.startsWith('/') ? p : '/' + p);
};
