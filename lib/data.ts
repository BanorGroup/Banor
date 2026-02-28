import siteConfig from "@/data/site-config.json";

export type SiteConfig = typeof siteConfig;

export async function getSiteConfig(): Promise<SiteConfig> {
  return siteConfig as SiteConfig;
}

export async function getPageData(slug: string) {
  const data = await import(`@/data/pages/${slug}.json`);
  return data.default;
}

export async function getProjects() {
  const data = await import("@/data/content/projects.json");
  return data.default;
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((p: { slug: string }) => p.slug === slug) ?? null;
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((p: { featured?: boolean }) => p.featured === true);
}

export async function getTeam() {
  const data = await import("@/data/content/team.json");
  return data.default;
}

export async function getInsights() {
  const data = await import("@/data/content/insights.json");
  return data.default;
}

export async function getInsight(slug: string) {
  const insights = await getInsights();
  return insights.find((i: { slug: string }) => i.slug === slug) ?? null;
}

export async function getAuthors() {
  const data = await import("@/data/authors.json");
  return data.default;
}

export async function getAuthor(id: string) {
  const authors = await getAuthors();
  return authors.find((a: { id: string }) => a.id === id) ?? null;
}
