import Link from "next/link";
import { Hero } from "@/components/hero";
import { getInsights, getAuthor } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Insights",
  description: "Thought leadership on integrated redevelopment and impact investing.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await getInsights();
  const authorIds = [...new Set(insights.map((i: { author: string }) => i.author))] as string[];
  const authorPromises = authorIds.map((id) => getAuthor(id));
  const authors = await Promise.all(authorPromises);
  const authorMap = Object.fromEntries(
    authorIds.map((id, i) => [id, authors[i]?.name ?? id])
  );
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
  ];
  const breadcrumbJSONLD = generateBreadcrumbJSONLD(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />
      <Hero
        title="Insights"
        subtitle="Thought Leadership"
        intro="Perspectives on integrated redevelopment, workforce development, and impact investment."
      />
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`}>
                <article className="group rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 hover:border-primary/50 transition-colors h-full flex flex-col">
                  <span className="text-primary text-sm font-medium">{insight.category}</span>
                  <h3 className="text-xl font-semibold text-slate-100 mt-1.5 group-hover:text-primary transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-1.5 flex-1">{insight.excerpt}</p>
                  <div className="mt-3 text-slate-500 text-sm">
                    {new Date(insight.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {authorMap[insight.author] ?? insight.author}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
