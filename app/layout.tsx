import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { getSiteConfig } from "@/lib/data";
import { generateSEO, generateOrganizationJSONLD } from "@/lib/seo";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const metadata: Metadata = generateSEO();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  const orgJSONLD = generateOrganizationJSONLD();

  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className={`${dmSans.className} min-h-screen flex flex-col antialiased`}>
        <ScrollProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJSONLD) }}
        />
        <Header config={config} />
        <main className="flex-1">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
