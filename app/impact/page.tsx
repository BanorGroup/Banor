import { Hero } from "@/components/hero";
import { SectionRenderer } from "@/components/sections";
import { getPageData } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Impact",
  description:
    "Data-driven impact metrics: properties rehabilitated, youth trained, jobs created.",
  path: "/impact",
});

export default async function ImpactPage() {
  const pageData = await getPageData("impact");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Impact", href: "/impact" },
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
        <SectionRenderer key={section.id || i} section={section} />
      ))}
    </>
  );
}
