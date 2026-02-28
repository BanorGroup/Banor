import { Hero } from "@/components/hero";
import { SectionRenderer } from "@/components/sections";
import { getPageData } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "The Model",
  description:
    "Why fragmented redevelopment fails. The Banor integrated solution closes the loop between workforce, property, and capital.",
  path: "/model",
});

export default async function ModelPage() {
  const pageData = await getPageData("model");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "The Model", href: "/model" },
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
