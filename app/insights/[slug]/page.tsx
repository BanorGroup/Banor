import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getInsight, getInsights, getAuthor } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i: { slug: string }) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};
  const author = await getAuthor(insight.author);
  return generateSEO({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
    type: "article",
    publishedTime: insight.date,
    authors: author ? [author.name] : [],
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const author = await getAuthor(insight.author);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: insight.title, href: `/insights/${slug}` },
  ];
  const breadcrumbJSONLD = generateBreadcrumbJSONLD(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />
      <article className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-4">
            <span className="text-primary font-medium">{insight.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-3">
            {insight.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-slate-400 text-sm mb-8">
            <time dateTime={insight.date}>
              {new Date(insight.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {author && <span>By {author.name}</span>}
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            {insight.contentSections?.map(
              (
                section: { type: string; content?: string },
                i: number
              ) => (
                <p key={i} className="text-slate-300 leading-relaxed mb-4">
                  {section.content}
                </p>
              )
            )}
          </div>

          {author && (
            <div className="mt-10 pt-6 border-t border-slate-800">
              <p className="text-slate-400 text-sm">
                <strong className="text-slate-200">{author.name}</strong> — {author.role}.{" "}
                {author.bio}
              </p>
            </div>
          )}

          <div className="mt-10">
            <Button asChild variant="outline">
              <Link href="/insights">← Back to Insights</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
