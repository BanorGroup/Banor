"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroConstructingProps {
  title: string;
  subtitle?: string;
  intro?: string;
  heroImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroConstructing({
  title,
  subtitle,
  intro,
  heroImage,
  primaryCta,
  secondaryCta,
}: HeroConstructingProps) {
  const [buildProgress, setBuildProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setBuildProgress(eased);

      if (rawProgress > 0.15) setContentVisible(true);

      if (rawProgress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(${(1 - buildProgress) * 100}% 0 0 0)`,
            }}
          >
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover scale-105"
              priority
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(12,18,32,0.92) 0%, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.95) 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-brand-accent to-primary transition-all duration-300 origin-left"
            style={{
              width: `${buildProgress * 100}%`,
              opacity: buildProgress < 1 ? 0.9 : 0,
            }}
          />
        </div>
      )}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24 md:py-28">
        <div
          className={`max-w-4xl transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <p
            className="text-primary font-medium text-sm uppercase tracking-widest mb-4 transition-all duration-700"
            style={{ opacity: contentVisible ? 1 : 0 }}
          >
            Integrated Redevelopment Platform
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-slate-50 mb-4 leading-[1.08] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-xl md:text-2xl font-medium mb-4 transition-all duration-700 delay-150"
              style={{ opacity: contentVisible ? 1 : 0 }}
            >
              <span className="bg-gradient-to-r from-primary via-brand-accent to-primary bg-clip-text text-transparent">
                {subtitle}
              </span>
            </p>
          )}
          {intro && (
            <p
              className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8 transition-all duration-700 delay-200"
              style={{ opacity: contentVisible ? 1 : 0 }}
            >
              {intro}
            </p>
          )}
          <div
            className="flex flex-wrap gap-4 transition-all duration-700 delay-300"
            style={{ opacity: contentVisible ? 1 : 0 }}
          >
            {primaryCta && (
              <Button asChild size="lg" className="group glow-primary">
                <Link href={primaryCta.href} className="inline-flex items-center gap-2">
                  {primaryCta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
