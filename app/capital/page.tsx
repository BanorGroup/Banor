import { Hero } from "@/components/hero";
import { SectionRenderer } from "@/components/sections";
import { RevealOnScroll } from "@/components/scroll-reveal";
import { getPageData } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Banor Capital",
  description:
    "Impact investment, blended capital, and scaling the Banor model globally.",
  path: "/capital",
});

export default async function CapitalPage() {
  const pageData = await getPageData("capital");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Capital", href: "/capital" },
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
