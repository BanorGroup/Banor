import { Hero } from "@/components/hero";
import { SectionRenderer } from "@/components/sections";
import { RevealOnScroll } from "@/components/scroll-reveal";
import { getPageData } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Banor Development",
  description:
    "Property acquisition, rehabilitation, and neighborhood stabilization.",
  path: "/development",
});

export default async function DevelopmentPage() {
  const pageData = await getPageData("development");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Development", href: "/development" },
  ];
  const breadcrumbJSONLD = generateBreadcrumbJSONLD(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />
      <Hero
        title={pageData.title}
        subtitle={pageData.subtitle}
        intro={pageData.intro}
        heroImage={pageData.heroImage}
      />
      {pageData.sections?.map((section: { id: string; type: string; [key: string]: unknown }, i: number) => (
        <RevealOnScroll key={section.id || i} variant="slide-up" delay={i * 80}>
          <SectionRenderer section={section} />
        </RevealOnScroll>
      ))}
    </>
  );
}
