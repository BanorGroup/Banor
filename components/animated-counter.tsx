"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={className} /> : null;
}

function parseValue(value: string): { num: number; suffix: string; prefix: string } {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return { num: 0, suffix: value, prefix: "" };
  const [, prefix = "", numStr, suffix = ""] = match;
  const num = parseInt(numStr.replace(/,/g, ""), 10) || 0;
  return { num, suffix: suffix.trim(), prefix: prefix.trim() };
}

function AnimatedStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const { num, suffix, prefix } = parseValue(value);

  useEffect(() => {
    if (hasAnimated || num === 0) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, num]);

  useEffect(() => {
    if (!hasAnimated) return;
    if (num === 0 && value.replace(/[0-9,]/g, "").length > 0) {
      setDisplayValue(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.floor(num * eased);
      const formatted = current.toLocaleString();
      setDisplayValue(`${prefix}${formatted}${suffix}`.trim());
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasAnimated, num, suffix, prefix, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700/50 text-center backdrop-blur-sm transition-all duration-700 ease-out card-hover"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-3">
        <DynamicIcon name={icon} className="size-6" />
      </div>
      <div className="font-display text-3xl md:text-4xl font-normal text-primary mb-2">
        {hasAnimated ? displayValue : "0"}
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
}

export function StatsGridAnimatedSection({
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
        <div className={`grid grid-cols-2 gap-5 ${items.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {items.map((item, i) => (
            <AnimatedStat key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
