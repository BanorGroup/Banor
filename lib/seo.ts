import type { Metadata } from "next";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  breadcrumbs?: { name: string; href: string }[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://banorgroup.com";

export function generateSEO(props: SEOProps = {}): Metadata {
  const {
    title,
    description,
    image = "/og-image.jpg",
    path = "",
    type = "website",
    publishedTime,
    authors = [],
    breadcrumbs = [],
  } = props;

  const fullTitle = title ? `${title} | Banor Group` : "Banor Group | Integrated Redevelopment Ecosystem";
  const fullDescription =
    description ||
    "One Mission. Three Engines. Train. Build. Fund. Scale. Banor Group transforms neighborhoods through workforce development, property rehabilitation, and impact investment.";
  const canonical = path ? `${BASE_URL}${path}` : BASE_URL;
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonical,
      siteName: "Banor Group",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type,
      ...(publishedTime && type === "article" && { publishedTime }),
      ...(authors.length > 0 && type === "article" && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
      creator: "@banorgroup",
    },
  };

  return metadata;
}

export function generateBreadcrumbJSONLD(breadcrumbs: { name: string; href: string }[]) {
  const items = breadcrumbs.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.name,
    item: b.href.startsWith("http") ? b.href : `${BASE_URL}${b.href}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function generateOrganizationJSONLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Banor Group",
    description:
      "Integrated redevelopment ecosystem—Foundation, Development, and Capital—transforming neighborhoods through workforce training, property rehabilitation, and impact investment.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: ["https://linkedin.com/company/banorgroup", "https://twitter.com/banorgroup"],
  };
}
