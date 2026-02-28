"use client";

import * as Icons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatsGridAnimatedSection } from "@/components/animated-counter";
import { ConstructingImage } from "@/components/constructing-image";
import { RevealOnScroll } from "@/components/scroll-reveal";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={cn("size-6", className)} /> : null;
}

export function TextSection({
  title,
  content,
  cta,
}: {
  title?: string;
  content: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {title && <h2 className="font-display text-3xl md:text-4xl font-normal mb-6 text-slate-100">{title}</h2>}
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">{content}</p>
        {cta && (
          <Button asChild>
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}

export function FeatureGridSection({
  title,
  subtitle,
  items,
}: {
  title?: string;
  subtitle?: string;
  items: Array<{ title: string; description: string; icon: string }>;
}) {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-900/40 to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 mb-2">{title}</h2>
            {subtitle && <p className="text-primary font-medium text-lg">{subtitle}</p>}
          </div>
        )}
        <div className={`grid md:grid-cols-2 gap-5 lg:gap-6 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {items.map((item, i) => (
            <RevealOnScroll key={i} variant="scale-in" delay={i * 80}>
              <div
                className="card-hover rounded-2xl bg-slate-800/60 p-6 border border-slate-700/50 backdrop-blur-sm"
              >
              <div className="mb-4 p-3 w-fit rounded-xl bg-primary/10 text-primary">
                <DynamicIcon name={item.icon} className="size-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsGridSection({
  title,
  items,
}: {
  title?: string;
  items: Array<{ label: string; value: string; icon: string }>;
}) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 text-center mb-10">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <RevealOnScroll key={i} variant="scale-in" delay={i * 80}>
              <div
                className="card-hover rounded-2xl bg-slate-800/60 p-6 border border-slate-700/50 backdrop-blur-sm text-center"
              >
              <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-4">
                <DynamicIcon name={item.icon} className="size-6" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-normal text-primary mb-2">{item.value}</div>
              <div className="text-slate-400 text-sm font-medium">{item.label}</div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessStepsSection({
  title,
  steps,
}: {
  title?: string;
  steps: Array<{ title: string; description: string; icon: string }>;
}) {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-900/40 to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 text-center mb-10">
            {title}
          </h2>
        )}
        <div className={`grid md:grid-cols-2 gap-5 lg:gap-6 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {steps.map((step, i) => (
            <RevealOnScroll key={i} variant="slide-up" delay={i * 80}>
            <div className="relative">
              <div className="card-hover rounded-2xl bg-slate-800/60 p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="mb-4 p-3 w-fit rounded-xl bg-primary/10 text-primary">
                  <DynamicIcon name={step.icon} className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-600 to-transparent" />
              )}
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IconListSection({
  title,
  items,
}: {
  title?: string;
  items: Array<{ title: string; description: string; icon: string }>;
}) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="font-display text-3xl md:text-4xl font-normal text-slate-100 text-center mb-8">
            {title}
          </h2>
        )}
        <div className="max-w-2xl mx-auto space-y-3">
          {items.map((item, i) => (
            <RevealOnScroll key={i} variant="slide-in-right" delay={i * 60}>
            <div className="card-hover flex gap-4 items-start rounded-2xl bg-slate-800/50 p-5 border border-slate-700/50">
              <div className="shrink-0 p-2.5 rounded-xl bg-primary/10 text-primary">
                <DynamicIcon name={item.icon} className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CallToActionSection({
  title,
  content,
  cta,
}: {
  title: string;
  content: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-brand-accent/15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-50 mb-4">{title}</h2>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">{content}</p>
        <Button asChild size="lg" className="glow-primary">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}

export function TimelineSection({
  title,
  items,
}: {
  title?: string;
  items: Array<{ year: string; title: string; description: string }>;
}) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 text-center mb-10">
            {title}
          </h2>
        )}
        <div className="max-w-3xl mx-auto">
          {items.map((item, i) => (
            <RevealOnScroll key={i} variant="slide-up" delay={i * 100}>
            <div className="flex gap-6 mb-8 last:mb-0">
              <div className="shrink-0 w-24 text-right">
                <span className="font-display text-2xl font-normal text-primary">{item.year}</span>
              </div>
              <div className="flex-1 border-l-2 border-primary/30 pl-6 pb-8 last:pb-0">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterGallerySection({
  title,
  subtitle,
  items,
}: {
  title?: string;
  subtitle?: string;
  items: Array<{ before: string; after: string; label: string }>;
}) {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-900/40 to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-normal text-slate-100 mb-2">{title}</h2>
            {subtitle && <p className="text-primary font-medium text-lg">{subtitle}</p>}
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <RevealOnScroll key={i} variant="scale-in" delay={i * 100}>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50">
                  <ConstructingImage
                    src={item.before}
                    alt={`${item.label} before`}
                    fill
                    className="absolute inset-0"
                    imgClassName="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    variant="scan-line"
                  />
                  <span className="absolute bottom-3 left-3 z-10 rounded-lg bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-sm">
                    Before
                  </span>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50">
                  <ConstructingImage
                    src={item.after}
                    alt={`${item.label} after`}
                    fill
                    className="absolute inset-0"
                    imgClassName="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    variant="build-up"
                  />
                  <span className="absolute bottom-3 left-3 z-10 rounded-lg bg-primary/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    After
                  </span>
                </div>
              </div>
              <p className="text-slate-300 text-sm font-medium text-center">{item.label}</p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection({
  title,
  items,
}: {
  title?: string;
  items: Array<{ quote: string; author: string }>;
}) {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-900/40 to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 text-center mb-10">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <RevealOnScroll key={i} variant="scale-in" delay={i * 100}>
            <blockquote className="card-hover rounded-2xl bg-slate-800/60 p-6 border border-slate-700/50 backdrop-blur-sm">
              <p className="text-slate-200 text-lg leading-relaxed italic mb-4">&ldquo;{item.quote}&rdquo;</p>
              <cite className="text-primary font-medium not-italic">{item.author}</cite>
            </blockquote>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

const SECTION_RENDERERS: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  text: TextSection as React.ComponentType<Record<string, unknown>>,
  "feature-grid": FeatureGridSection as React.ComponentType<Record<string, unknown>>,
  "stats-grid": StatsGridSection as React.ComponentType<Record<string, unknown>>,
  "stats-grid-animated": StatsGridAnimatedSection as React.ComponentType<Record<string, unknown>>,
  "process-steps": ProcessStepsSection as React.ComponentType<Record<string, unknown>>,
  "before-after-gallery": BeforeAfterGallerySection as React.ComponentType<Record<string, unknown>>,
  "icon-list": IconListSection as React.ComponentType<Record<string, unknown>>,
  "call-to-action": CallToActionSection as React.ComponentType<Record<string, unknown>>,
  timeline: TimelineSection as React.ComponentType<Record<string, unknown>>,
  testimonial: TestimonialSection as React.ComponentType<Record<string, unknown>>,
};

export function SectionRenderer({
  section,
}: {
  section: { type: string; [key: string]: unknown };
}) {
  const Renderer = SECTION_RENDERERS[section.type];
  if (!Renderer) return null;
  return <Renderer {...section} />;
}
