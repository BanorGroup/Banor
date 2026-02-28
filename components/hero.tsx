import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  intro?: string;
  heroImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({
  title,
  subtitle,
  intro,
  heroImage,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageSrc(heroImage)}
            alt=""
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(12,18,32,0.9) 0%, rgba(15,23,42,0.8) 50%, rgba(15,23,42,0.95) 100%)",
            }}
          />
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-24">
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal text-slate-50 mb-4 leading-tight tracking-tight animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium mb-4 bg-gradient-to-r from-primary via-brand-accent to-primary bg-clip-text text-transparent animate-fade-up animation-delay-75 opacity-0" style={{ animationFillMode: "forwards" }}>
              {subtitle}
            </p>
          )}
          {intro && (
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8 animate-fade-up animation-delay-150 opacity-0" style={{ animationFillMode: "forwards" }}>
              {intro}
            </p>
          )}
          <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300 opacity-0" style={{ animationFillMode: "forwards" }}>
            {primaryCta && (
              <Button asChild size="lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="border-slate-600 hover:border-primary/60 hover:bg-primary/5">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
