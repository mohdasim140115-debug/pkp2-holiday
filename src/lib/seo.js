import seoOverrides from "../../data/seo.json";

// Looks up an admin-configured title/description override for a given route
// path and shallow-merges it over the page's default metadata object.
export function applySeoOverride(pathname, defaultMetadata = {}) {
  const override = seoOverrides.find((o) => o.path === pathname);
  if (!override) return defaultMetadata;

  return {
    ...defaultMetadata,
    ...(override.title ? { title: override.title } : {}),
    ...(override.description ? { description: override.description } : {}),
  };
}
