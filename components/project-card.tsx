"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { ConstructingImage } from "@/components/constructing-image";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={className} /> : null;
}

interface ProjectCardProps {
  slug: string;
  title: string;
  location: string;
  summary: string;
  arm: string;
  status: string;
  images?: string[];
  icon?: string;
}

export function ProjectCard({
  slug,
  title,
  location,
  summary,
  arm,
  status,
  images = [],
  icon = "Building2",
}: ProjectCardProps) {
  const armLabels: Record<string, string> = {
    foundation: "Foundation",
    development: "Development",
    capital: "Capital",
  };
  return (
    <Link href={`/projects/${slug}`}>
      <article className="group rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        <div className="aspect-video bg-slate-800 relative overflow-hidden">
          {images[0] ? (
            <ConstructingImage
              src={images[0]}
              alt={title}
              fill
              className="aspect-video relative"
              imgClassName="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              variant="build-up"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
              <DynamicIcon name={icon} className="size-16" />
            </div>
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-lg bg-primary/95 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {armLabels[arm] ?? arm}
            </span>
            <span className="rounded-lg bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
              {status}
            </span>
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="text-xl font-semibold text-slate-100 group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
          <p className="text-slate-500 text-sm font-medium mb-2">{location}</p>
          <p className="text-slate-400 leading-relaxed">{summary}</p>
        </div>
      </article>
    </Link>
  );
}
