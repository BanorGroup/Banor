import { Hero } from "@/components/hero";
import { SectionRenderer } from "@/components/sections";
import { getPageData } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Partner / Invest",
  description: "Join the Banor ecosystem as an impact investor or partner.",
  path: "/partner",
});

export default async function PartnerPage() {
  const pageData = await getPageData("partner");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Partner / Invest", href: "/partner" },
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
