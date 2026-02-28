import { Hero } from "@/components/hero";
import { SectionRenderer } from "@/components/sections";
import { getPageData } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact",
  description: "Contact Banor Group for partnerships, investments, and inquiries.",
  path: "/contact",
});

export default async function ContactPage() {
  const pageData = await getPageData("contact");
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
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
